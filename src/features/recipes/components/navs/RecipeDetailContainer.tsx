import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/features/common/components/PageTransition';

const RecipeDetailContainer = () => {
	const location = useLocation();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: 'fit-content',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				p: 2,
			}}>
			<AnimatePresence mode='wait'>
				<PageTransition key={location.pathname}>
					<Outlet />
				</PageTransition>
			</AnimatePresence>
		</Box>
	);
};

export default RecipeDetailContainer;
