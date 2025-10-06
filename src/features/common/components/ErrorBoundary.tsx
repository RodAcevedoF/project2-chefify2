import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import logger from '@/lib/logger';

type Props = {
	children: React.ReactNode;
};

type State = {
	hasError: boolean;
	error?: Error | null;
	errorInfo?: React.ErrorInfo | null;
	copied?: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
			copied: false,
		};
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// You can log the error to an external service here
		// Example: analytics.logError(error, errorInfo);
		this.setState({ error, errorInfo });
		// capture with logger
		logger.error(error, { componentStack: errorInfo.componentStack });
		console.error('Uncaught error:', error, errorInfo);
	}

	handleReload = () => {
		// Reset state and reload page
		this.setState({ hasError: false, error: null, errorInfo: null });
		window.location.reload();
	};

	handleCopyReport = async () => {
		try {
			const payload = {
				message: this.state.error?.message ?? null,
				stack: this.state.error?.stack ?? null,
				componentStack: this.state.errorInfo?.componentStack ?? null,
				breadcrumbs: logger.getBreadcrumbs?.() ?? [],
				ts: new Date().toISOString(),
			};

			const text = JSON.stringify(payload, null, 2);
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(text);
			} else {
				// fallback: open prompt so user can copy
				window.prompt('Copia el reporte manualmente (CTRL/CMD+C):', text);
			}

			// feedback
			this.setState({ copied: true });
			logger.info('Error report copied to clipboard', {
				message: this.state.error?.message,
			});
			setTimeout(() => this.setState({ copied: false }), 3000);
		} catch (e) {
			logger.warn('Failed to copy error report', { err: (e as Error).message });
		}
	};

	render() {
		if (this.state.hasError) {
			return (
				<Box
					sx={{
						height: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						p: 2,
						bgcolor: 'background.default',
					}}>
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant='h4' gutterBottom>
							Something went wrong.
						</Typography>
						<Typography variant='body1' sx={{ mb: 2 }}>
							An unexpected error has occurred. Please try reloading the page.
						</Typography>
						<Box sx={{ mb: 2 }}>
							<Typography
								component='pre'
								sx={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
								{this.state.error?.message}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
							<Button
								variant='contained'
								color='primary'
								onClick={this.handleReload}>
								Recargar
							</Button>
							<Button
								variant='outlined'
								color='primary'
								onClick={this.handleCopyReport}>
								{this.state.copied ? 'Copiado' : 'Copiar reporte'}
							</Button>
						</Box>
					</Box>
				</Box>
			);
		}

		return this.props.children as React.ReactNode;
	}
}

export default ErrorBoundary;
