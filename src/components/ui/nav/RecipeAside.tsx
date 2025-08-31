import { memo } from 'react';
import type { Recipe } from '@/types/recipe.types';
import { useGetRecipes } from '../../../hooks/recipeHooks/useGetRecipes';
import { Box, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecipeAside = memo(() => {
	const { data, isLoading, error, isError } = useGetRecipes();
	const navigate = useNavigate();
	const handleGetDetails = (id: string) => navigate(`/recipes/${id}`);

	return (
		<Box
			component='aside'
			sx={{
				display: 'flex',
				width: 'fit-content',
				border: 2,
				padding: 2,
			}}>
			<ul>
				Last recipes:
				{isLoading && <p>Loading recipes...</p>}
				{isError && <p>Error: {error?.message || 'There was an error'}</p>}
				{data?.map((recipe: Recipe) => (
					<ListItemButton
						key={recipe._id}
						onClick={() => handleGetDetails(recipe._id)}>
						<ListItemText primary={recipe.title} />
					</ListItemButton>
				))}
			</ul>
		</Box>
	);
});

export default RecipeAside;
