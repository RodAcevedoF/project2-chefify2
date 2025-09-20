import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const RecipeDetailContainer = () => {
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
			<Outlet />
		</Box>
	);
};

export default RecipeDetailContainer;
