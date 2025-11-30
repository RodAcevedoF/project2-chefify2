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
			<Box
				display={'flex'}
				gap={2}
				sx={{
					my: { xs: 2, sm: 1 },
					display: 'flex',
					gap: 2,
					flexWrap: { xs: 'wrap', sm: 'nowrap' },
					justifyContent: { xs: 'center', sm: '' },
				}}>
				<CardActionArea
					onClick={() => openModal('generalImg', { imgUrl: recipe.imgUrl })}
					sx={{ width: 'fit-content', height: 'fit-content', zIndex: 0 }}
					aria-label={`Open ${recipe.title ?? 'recipe'} modal`}>
					<CardMedia
						component='img'
						image={recipe.imgUrl || '/landing-default/default-recipe.webp'}
						alt={recipe.title ?? 'default recipe image'}
						sx={{
							borderRadius: 2,
							width: { xs: '120px', sm: '100px', zIndex: 0 },
							objectFit: 'cover',
						}}
					/>
				</CardActionArea>
				<Box>
					<Typography
						variant='h4'
						fontWeight='bold'
						mb={1}
						sx={{
							fontFamily: 'Alegreya',
							fontSize: { xs: '1.5rem', sm: '2rem' },
						}}>
						{capitalize(recipe.title ?? '')}
					</Typography>
					<Stack
						direction='row'
						sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1 }}>
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
							? { _id: recipe.userId, name: 'unknown' }
							: recipe.userId ?? { _id: '', name: 'unknown' }
					}
				/>
			</Stack>
		</Box>
	);
};

export default RecipeTitle;
