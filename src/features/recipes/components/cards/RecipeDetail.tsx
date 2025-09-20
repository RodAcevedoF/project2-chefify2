import {
	Typography,
	Box,
	Card,
	CardMedia,
	Chip,
	Stack,
	Container,
	List,
	ListItem,
} from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import { useGetRecipeByID } from '@/features/recipes/hooks/useGetRecipes';
import { capitalize } from '@/features/common/utils/capitalize.helper';

const RecipeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { data: recipe, isLoading, error } = useGetRecipeByID(id);
	console.log(recipe);
	if (!id) return <Navigate to='/recipes' replace />;
	if (isLoading) return <Typography>Loading recipe details...</Typography>;
	if (error) return <Typography>Error loading recipe details.</Typography>;
	if (!recipe) return <Typography>No recipe found.</Typography>;

	return (
		<Card
			sx={{
				display: 'flex',
				p: 3,
				boxShadow: 6,
				borderRadius: 4,
				flexDirection: 'column',
				gap: 2,
				height: '100%',
				width: '100%',
			}}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
				<Box>
					<Typography variant='h4' fontWeight='bold' mb={1}>
						{capitalize(recipe.title)}
					</Typography>
					<Stack direction='row' spacing={1} mb={2}>
						{Array.isArray(recipe.categories) &&
							recipe.categories.map((cat) => (
								<Chip
									key={cat}
									label={cat}
									color='primary'
									variant='outlined'
								/>
							))}
					</Stack>
					<Typography variant='subtitle2' mb={1}>
						Prep time: {recipe.prepTime} min | Servings: {recipe.servings}
					</Typography>
					<Typography variant='subtitle2' mb={2}>
						By:{' '}
						{typeof recipe.userId === 'object' && recipe.userId !== null
							? recipe.userId.name
							: recipe.userId}
					</Typography>
					<Typography variant='h6' mt={2} mb={1}>
						Ingredients:
					</Typography>
					<List sx={{ display: 'flex' }}>
						{recipe.ingredients.map((ing) => (
							<ListItem key={ing._id}>
								<Typography variant='body2'>
									{ing.ingredient?.name || ''}
								</Typography>
							</ListItem>
						))}
					</List>
				</Box>
				<CardMedia
					component='img'
					image={recipe.imgUrl}
					alt={recipe.title}
					sx={{ borderRadius: 2, mb: 2, width: 240, objectFit: 'cover' }}
				/>
			</Box>
			<Container maxWidth={false} sx={{ display: 'flex' }}>
				<Box>
					<Typography variant='h6' mb={1}>
						Instructions:
					</Typography>
					<ol>
						{recipe.instructions.map((step, idx) => (
							<li key={step + idx}>
								<Typography variant='body2'>{step}</Typography>
							</li>
						))}
					</ol>
				</Box>
				{Array.isArray(recipe.utensils) && (
					<Box mt={2}>
						<Typography variant='subtitle2' mb={1}>
							Utensils: {recipe.utensils.join(', ')}
						</Typography>
					</Box>
				)}
			</Container>
		</Card>
	);
};

export default RecipeDetail;
