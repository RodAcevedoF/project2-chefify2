import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { ModalProvider } from '@/contexts/modalContext/modal.provider.tsx';
import { QueryClientWrapper } from '@/lib/queryClient.tsx';
import { LoggedProvider } from '@/contexts/loggedContext/logged.provider.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';
import ErrorBoundary from '@/features/common/components/ErrorBoundary';

const root = document.getElementById('root')!;

createRoot(root).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<QueryClientWrapper>
				<LoggedProvider>
					<ErrorBoundary>
						<ModalProvider>
							<App />
						</ModalProvider>
					</ErrorBoundary>
				</LoggedProvider>
			</QueryClientWrapper>
		</ThemeProvider>
	</StrictMode>,
);
