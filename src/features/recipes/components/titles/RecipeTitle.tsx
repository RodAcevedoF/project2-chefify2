import { capitalize } from '@/features/common/utils/capitalize.helper';
import {
	Box,
	CardActionArea,
	CardMedia,
	Chip,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import LikeButton from '../LikeButton';
import type { RecipeDTO } from '@/types/recipe.types';
import { useHasLike, useLike, useUnlike } from '../../hooks';
import FollowAuthor from '../cards/FollowElement';
import { recipeStyles } from '../../recipe.theme';
import { useModalContext } from '@/contexts/modalContext/modal.context';

type RecipeTitleProps = {
	recipe: RecipeDTO;
	params: { id: string };
};

const RecipeTitle = ({ recipe, params }: RecipeTitleProps) => {
	const theme = useTheme();
	const style = recipeStyles(theme);
	const userLiked = useHasLike(params.id as string).data;
	const likeMutation = useLike(params.id as string);
	const unlikeMutation = useUnlike(params.id as string);
	const { openModal } = useModalContext();

	return (
		<Box border={1} sx={style.recipeDetail.title.container}>
			<Box display={'flex'} gap={2}>
				<CardActionArea
					onClick={() => openModal('recipeImg', recipe)}
					sx={{ width: 'fit-content', height: 'fit-content', zIndex: 0 }}
					aria-label={`Open ${recipe.title ?? 'recipe'} modal`}>
					<CardMedia
						component='img'
						image={recipe.imgUrl || '/default-recipe.png'}
						alt={recipe.title ?? 'default recipe image'}
						sx={{
							borderRadius: 2,
							width: { xs: '80px', sm: '100px', zIndex: 0 },
							objectFit: 'cover',
						}}
					/>
				</CardActionArea>
				<Box>
					<Typography
						variant='h4'
						fontWeight='bold'
						mb={1}
						sx={{ fontFamily: 'Alegreya' }}>
						{capitalize(recipe.title ?? '')}{' '}
						<span style={{ fontSize: 12, color: 'gray' }}></span>
					</Typography>
					<Stack direction='row'>
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
				</Box>
			</Box>
			<Stack direction='column' sx={{ gap: 1, minWidth: 'fit-content' }}>
				<LikeButton
					displayedHasLiked={userLiked ?? false}
					displayedLikesCount={recipe?.likesCount ?? 0}
					disabled={false}
					onToggle={userLiked ? unlikeMutation.mutate : likeMutation.mutate}
				/>
				<FollowAuthor
					rawAuthor={
						typeof recipe.userId === 'string'
							? { _id: recipe.userId, name: '' }
							: recipe.userId ?? { _id: '', name: '' }
					}
				/>
			</Stack>
		</Box>
	);
};

export default RecipeTitle;
