import { Typography, Box, Card, useTheme } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import { useGetRecipeByID } from '@/features/recipes/hooks';
import IngredientSection from '../titles/IngredientSection';
import RecipeTitle from '../titles/RecipeTitle';
import TimeAndServings from '../sections/TimeAndServings';
import Utensils from './Utensils';
import Instructions from '../sections/Instructions';
import RecipeButtons from '../sections/RecipeButtons';
import { recipeStyles } from '../../recipe.theme';

const RecipeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { data: recipe, isLoading, error } = useGetRecipeByID(id);
	const theme = useTheme();
	const style = recipeStyles(theme);
	if (!id) return <Navigate to='/recipes' replace />;
	if (isLoading) return <Typography>Loading recipe details...</Typography>;
	if (error) return <Typography>Error loading recipe details.</Typography>;
	if (!recipe) return <Typography>No recipe found.</Typography>;

	return (
		<Card sx={style.recipeDetail.Card}>
			<RecipeTitle recipe={recipe} params={{ id }} />
			<Box sx={style.recipeDetail.mainBox}>
				<Box sx={style.recipeDetail.rightBox}>
					<TimeAndServings
						prepTime={recipe.prepTime}
						servings={recipe.servings}
					/>
					<Box mb={2}>
						<IngredientSection ingredients={recipe.ingredients} />
					</Box>
					<Utensils utensils={recipe.utensils ? recipe.utensils : []} />
				</Box>
				<Box sx={style.recipeDetail.leftBox}>
					<Instructions instructions={recipe.instructions} />
					<RecipeButtons recipe={recipe} />
				</Box>
			</Box>
		</Card>
	);
};

export default RecipeDetail;
