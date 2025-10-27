import { Box, CardMedia } from '@mui/material';
import type { RecipeDTO } from '@/types/recipe.types';

type ImgModalProps = {
	recipe?: RecipeDTO;
};

export const ImgModal = (props: ImgModalProps = {}) => {
	const { recipe } = props;

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<CardMedia
					component='img'
					image={recipe?.imgUrl || '/default-recipe.png'}
					alt={recipe?.title ?? 'default recipe image'}
					sx={{
						borderRadius: 2,
						width: { xs: '95%', sm: '70%', md: '60%', lg: '50%' },
						objectFit: 'cover',
					}}
				/>
			</Box>
		</>
	);
};

export default ImgModal;
