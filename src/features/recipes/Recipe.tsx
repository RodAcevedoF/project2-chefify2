import RecipeAside from '@/features/recipes/components/navs/RecipeAside';
import RecipeDetailContainer from '@/features/recipes/components/navs/RecipeDetailContainer';
import { Box } from '@mui/material';

export const RecipeLayout = () => {
	return (
		<Box
			component='section'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				height: '100%',
				minHeight: '80vh',
				gap: 5,
			}}>
			<RecipeAside />
			<RecipeDetailContainer />
		</Box>
	);
};
