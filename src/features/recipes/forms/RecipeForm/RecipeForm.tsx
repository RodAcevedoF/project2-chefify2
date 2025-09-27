import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	TextField,
	Typography,
	CircularProgress,
	CardMedia,
	useTheme,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import {
	RECIPE_CATEGORY_OPTIONS,
	type RecipeDTO,
	type RecipeFormProps,
	RecipeSchema,
} from '@/types/recipe.types';
import { useCreateRecipe } from '../../hooks/useCreateRecipe';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import CategoriesInput from './components/categories-input';
import InstructionsInput from './components/instructions-input';
import { recipeFormStyles } from './recipe-form.theme';
export const RecipeForm = ({ onSuccess, className = '' }: RecipeFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<RecipeDTO>({
		resolver: zodResolver(RecipeSchema.partial()),
	});
	const theme = useTheme();
	const [inputValue, setInputValue] = useState('');
	const rs = recipeFormStyles(theme);

	const createRecipeMutation = useCreateRecipe({
		onSuccess: () => onSuccess?.(),
	});

	const onSubmit = (data: RecipeDTO) => {
		createRecipeMutation.mutate(data);
	};

	return (
		<Box sx={rs.recipeFormBox} className={className}>
			<Box sx={rs.recipeFormBox.box}>
				<Typography sx={rs.recipeFormBox.typo}>Create Recipe</Typography>
				<CardMedia
					component={'img'}
					image='/logo.png'
					alt='Chef Hat'
					sx={{ width: 50, filter: 'invert(1)' }}
				/>
			</Box>
			<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={rs.form}>
				<TextField
					label='Title'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ width: '100%' }}
					placeholder='Lasagna'
					{...register('title')}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>

				<CategoriesInput
					label={'Categories'}
					name={'categories'}
					control={control}
					id={'categories-label'}
					categories={RECIPE_CATEGORY_OPTIONS}
					color={theme.palette.primary.main}
				/>
				<Box sx={rs.form.box}>
					<Box sx={rs.form.box.inBox}>
						<TextField
							label='Servings'
							type='number'
							size='small'
							{...register('servings', { valueAsNumber: true })}
							slotProps={{
								input: { sx: { paddingRight: '44px' } },
							}}
							fullWidth
						/>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={rs.form.box.typo}>
							people
						</Typography>
					</Box>

					<Box sx={rs.form.box.inBox}>
						<TextField
							label='Prep time'
							type='number'
							size='small'
							{...register('prepTime', { valueAsNumber: true })}
							error={!!errors.prepTime}
							slotProps={{
								input: { sx: { paddingRight: '44px' } },
							}}
							fullWidth
						/>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={rs.form.box.typo}>
							min
						</Typography>
					</Box>
				</Box>
				<InstructionsInput
					control={control}
					name={'instructions'}
					inputValue={inputValue}
					setInputValue={setInputValue}
					color={theme.palette.primary.main}
					backGroundColor={theme.palette.background.default}
				/>
			</Box>
			<Box sx={rs.createBtnBox}>
				<ButtonUsage
					label={
						createRecipeMutation.isPending ? (
							<CircularProgress
								size={20}
								sx={{ color: theme.palette.primary.main }}
							/>
						) : (
							'CREATE'
						)
					}
					disabled={createRecipeMutation.isPending}
					type='submit'
					icon={CirclePlus}
				/>
			</Box>
			{createRecipeMutation.isError && (
				<Typography color='error' mt={2}>
					Error while creating the recipe. Please try again.
				</Typography>
			)}
		</Box>
	);
};
