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

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientWrapper>
			<LoggedProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<ModalProvider>
							<App />
						</ModalProvider>
					</CssBaseline>
				</ThemeProvider>
			</LoggedProvider>
		</QueryClientWrapper>
	</StrictMode>,
);
