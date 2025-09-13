import { Typography, Box } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import { useGetRecipeByID } from '@/features/recipes/hooks/useGetRecipes';

const RecipeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { data: recipe, isLoading, error } = useGetRecipeByID(id);
	if (!id) return <Navigate to='/recipes' replace />;

	if (isLoading) return <Typography>Loading recipe details...</Typography>;
	if (error) return <Typography>Error loading recipe details.</Typography>;
	if (!recipe) return <Typography>No recipe found.</Typography>;

	return (
		<Box>
			<Typography variant='h5'>{recipe.title}</Typography>
			<Typography variant='body1'>
				{Array.isArray(recipe.categories)
					? recipe.categories.join(', ')
					: recipe.categories}
			</Typography>
		</Box>
	);
};

export default RecipeDetail;
