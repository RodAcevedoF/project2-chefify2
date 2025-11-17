import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from '@/features/common/components/layout/Navbar';
import { Footer } from '@/features/common/components/layout/Footer';
import { ModalRoot } from '@/features/common/components/modals/ModalRoot';
import PageRoutes from './PageRoutes';

import ToastFromLocation from '@/features/common/components/toasts/ToastFromLocation';
import LoginModalFromQuery from '@/features/common/components/toasts/LoginModalFromQuery';
import RedirectOnLogin from '@/features/common/components/RedirectOnLogin';

import { ScrollProvider } from './contexts/scrollContext/scroll.provider';

function App() {
	return (
		<Router>
			<ScrollProvider>
				{/* Toast / Modals */}
				<ToastFromLocation />
				<LoginModalFromQuery />

				{/* Layout */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh',
					}}>
					<Navbar />
					<RedirectOnLogin />

					{/* Animated Routes */}
					<Box component='main' sx={{ flex: 1, overflow: 'visible' }}>
						<AnimatePresence mode='wait' initial={false}>
							<PageRoutes />
						</AnimatePresence>
					</Box>

					<Footer />
				</Box>

				{/* Global Modals */}
				<ModalRoot />
			</ScrollProvider>
		</Router>
	);
}

export default App;
