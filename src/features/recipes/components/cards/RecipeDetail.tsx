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
import {} from 'react';
import { useGetRecipeByID } from '@/features/recipes/hooks';
import LikeButton from '@/features/recipes/components/LikeButton';
import AuthorFollow from '@/features/recipes/components/AuthorFollow';
import { useGetUser } from '@/features/profile/hooks/useUser';
import { capitalize } from '@/features/common/utils/capitalize.helper';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';

const RecipeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { data: recipe, isLoading, error } = useGetRecipeByID(id);
	const { data: me } = useGetUser();

	const author =
		typeof recipe?.userId === 'object' && recipe?.userId
			? (recipe.userId as {
					_id?: string;
					name?: string;
					isFollowing?: boolean;
			  })
			: null;
	// author id is available on `author._id` or recipe.userId when string
	// follow state and fetching moved to AuthorFollow component

	// like & follow behavior moved to separate components: LikeButton and AuthorFollow

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
					<Stack direction='row' spacing={1} alignItems='center' mb={1}>
						<LikeButton
							recipeId={id ?? ''}
							initialHasLiked={recipe.hasLiked}
							initialLikesCount={recipe.likesCount}
						/>
					</Stack>
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
						{typeof recipe.userId === 'object' && recipe.userId !== null ? (
							<>
								{recipe.userId.name} {/* Follow button next to author name */}
								{author &&
									(() => {
										// don't show follow for own profile
										if (!author._id || author._id === me?._id) return null;
										return <AuthorFollow authorId={author._id} recipeId={id} />;
									})()}
							</>
						) : (
							recipe.userId
						)}
					</Typography>
					<Typography variant='h6' mt={2} mb={1}>
						Ingredients:
					</Typography>
					<List sx={{ display: 'flex' }}>
						{recipe.ingredients.map((ing) => (
							<ListItem key={ing._id}>
								<Typography variant='body2'>
									{typeof ing.ingredient === 'object' && ing.ingredient !== null
										? ing.ingredient.name
										: ing.ingredient || ''}
								</Typography>
							</ListItem>
						))}
					</List>
					<Box>
						<Typography variant='h6'>Utensils:</Typography>
						{Array.isArray(recipe.utensils) && (
							<Typography variant='subtitle2' mb={1}>
								{recipe.utensils.join(', ')}
							</Typography>
						)}
					</Box>
				</Box>
				<CardMedia
					component='img'
					image={recipe.imgUrl || '/default-recipe.png'}
					alt={recipe.title}
					sx={{ borderRadius: 2, mb: 2, width: 240, objectFit: 'cover' }}
				/>
			</Box>
			<Container
				maxWidth={false}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					position: 'relative',
					alignItems: 'flex-end',
				}}>
				<Box>
					<Typography variant='h6'>Instructions:</Typography>
					<ol style={{ color: 'whitesmoke', fontSize: 12 }}>
						{recipe.instructions.map((step, idx) => (
							<li key={step + idx}>
								<Typography variant='body1'>{step}</Typography>
							</li>
						))}
					</ol>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						height: '100%',
					}}>
					<ButtonUsage label='Edit' />
					<ButtonUsage label='Delete' />
				</Box>
			</Container>
		</Card>
	);
};

export default RecipeDetail;
