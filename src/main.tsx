import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { ModalProvider } from '@/contexts/modalContext/modal.provider.tsx';
import { QueryClientWrapper } from '@/lib/queryClient.tsx';
import { LoggedProvider } from '@/contexts/loggedContext/logged.provider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientWrapper>
			<LoggedProvider>
				<ModalProvider>
					<App />
				</ModalProvider>
			</LoggedProvider>
		</QueryClientWrapper>
	</StrictMode>,
);
