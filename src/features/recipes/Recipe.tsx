import RecipeAside from '@/features/recipes/components/navs/RecipeAside';
import RecipeDetailContainer from '@/features/recipes/components/navs/RecipeDetailContainer';
import { Box } from '@mui/material';
import PrimarySearchAppBar from './components/SearchBar/SearchBar';

export const RecipeLayout = () => {
	return (
		<Box
			component='section'
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
				width: '100%',
			}}>
			<RecipeAside />
			<Box sx={{ flexGrow: 1, width: '100%' }}>
				<PrimarySearchAppBar />
				<RecipeDetailContainer />
			</Box>
		</Box>
	);
};
