import RecipeAside from '@/components/ui/nav/RecipeAside';
import RecipeDetailContainer from '@/components/ui/nav/RecipeDetailContainer';
import { Box } from '@mui/material';

export const RecipeLayout = () => {
	return (
		<Box
			component='section'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				width: '100%',
				height: '100%',
				border: 2,
				borderColor: 'red',
				padding: 5,
			}}>
			<RecipeAside />
			<RecipeDetailContainer />
		</Box>
	);
};
