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
		this.setState({ error, errorInfo });
		logger.error(error, { componentStack: errorInfo.componentStack });
	}

	handleReload = () => {
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
				window.prompt('Copy report manually (CTRL/CMD+C):', text);
			}

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
								Reload
							</Button>
							<Button
								variant='outlined'
								color='primary'
								onClick={this.handleCopyReport}>
								{this.state.copied ? 'Copy' : 'Copied report'}
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
