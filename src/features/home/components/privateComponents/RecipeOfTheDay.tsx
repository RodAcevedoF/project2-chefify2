import { type FC } from 'react';
import { Box, Paper, Typography, CardMedia } from '@mui/material';
import { useGetRecipes } from '@/features/recipes/hooks/useRecipes';
import { useMemo } from 'react';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

type RecipeOfTheDayProps = {
	bg?: string;
};

const RecipeOfTheDay: FC<RecipeOfTheDayProps> = ({ bg }) => {
	const navigate = useHandleNavigate((id?: string) => `/recipes/${id}`);
	const { data: recipes, isLoading } = useGetRecipes({ limit: 12 });

	const recipe = useMemo(() => {
		const list = Array.isArray(recipes) ? recipes : [];
		if (list.length === 0) return undefined;
		return list[Math.floor(Math.random() * list.length)];
	}, [recipes]);

	console.log('Recipe of the day selected:', recipe);
	const placeholder = '/priv-home/priv-recipe.webp';
	return (
		<Paper
			sx={{
				p: 0,
				borderRadius: 8,
				overflow: 'hidden',
				background: bg,
				height: '100%',
				width: { xs: '100%', md: '60%' },
			}}
			elevation={5}>
			<CardMedia
				component='img'
				height='300'
				src={recipe?.imgUrl || placeholder}
				alt={recipe?.title ?? 'Recipe of the day'}
			/>
			<Box sx={{ p: 2 }}>
				<Typography variant='body1' color='text.secondary'>
					Recipe of the day
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
					<Typography variant='h5' sx={{ fontFamily: 'Alegreya' }}>
						{recipe?.title ?? 'Featured recipe'}
					</Typography>
					<ButtonUsage
						label='View recipe'
						variant={ButtonVariants.OUTLINED}
						parentMethod={() => navigate(recipe?._id ?? '')}
						disabled={!recipe || isLoading}
					/>
				</Box>
			</Box>
		</Paper>
	);
};

export default RecipeOfTheDay;
