import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const RecipeDetailContainer = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				border: 1,
				padding: 5,
				flex: 1,
			}}>
			<Outlet />
		</Box>
	);
};

export default RecipeDetailContainer;
