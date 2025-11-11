import { useForm, type Resolver } from 'react-hook-form';
import { Box, TextField, Typography, CardMedia, useTheme } from '@mui/material';
import {
	CreateRecipeModes,
	RECIPE_CATEGORY_OPTIONS,
	RecipeSchema,
	type RecipeDTO,
	type RecipeFormProps,
} from '@/types/recipe.types';
import { useState } from 'react';
import CategoriesInput from './components/CategoriesInput';
import InstructionsInput from './components/InstructionsInput';
import { recipeFormStyles } from './recipe-form.theme';
import ServingInput from './components/ServingInput';
import PrepTimeInput from './components/PrepInput';
import CreateBtn from './components/CreateRecipe';
import IngredientsInput from './components/IngredientsInput';
import { zodResolver } from '@hookform/resolvers/zod';
import UploadIUmageInput from '@/features/common/components/input/UploadImgInput';
import { useImageUpload } from './hooks/useImageUpload';
import { useRecipeFormInitialization } from './hooks/useRecipeFormInitialization';
import { useRecipeSubmission } from './hooks/useRecipeSubmission';

export const RecipeForm = ({
	onSuccess,
	className = '',
	initialData,
}: RecipeFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		watch,
	} = useForm<RecipeDTO>({
		resolver: zodResolver(
			RecipeSchema.partial(),
		) as unknown as Resolver<RecipeDTO>,
	});

	const theme = useTheme();
	const [inputValue, setInputValue] = useState('');
	const [IngredientInput, setIngredientInput] = useState('');
	const rs = recipeFormStyles(theme, {});
	const editId = initialData?._id;

	const {
		imgPreview,
		selectedFile,
		handleImageChange,
		handleImageClear,
		clearSelectedFile,
		setImgPreview,
	} = useImageUpload({
		setValue,
		initialImageUrl: initialData?.imgUrl,
	});

	const {
		handleSubmit: handleRecipeSubmit,
		createRecipeMutation,
		updateRecipeMutation,
	} = useRecipeSubmission({
		onSuccess,
		editId,
	});

	useRecipeFormInitialization({
		initialData,
		setValue,
		setImgPreview,
	});

	const onSubmit = async (data: RecipeDTO) => {
		handleRecipeSubmit(data, selectedFile, clearSelectedFile);
	};
	return (
		<Box sx={rs.recipeFormBox} className={className}>
			<Box sx={rs.recipeFormBox.box}>
				<Typography sx={rs.recipeFormBox.typo}>
					{editId ? 'Edit Recipe' : 'Create Recipe'}
				</Typography>
				<CardMedia
					component={'img'}
					image='/logo.webp'
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
					<ServingInput register={register} />
					<PrepTimeInput register={register} errors={errors} />
				</Box>

				<InstructionsInput
					control={control}
					name={'instructions'}
					inputValue={inputValue}
					setInputValue={setInputValue}
					color={theme.palette.primary.main}
					backgroundColor={theme.palette.background.default}
				/>

				<IngredientsInput
					control={control}
					name='ingredients'
					inputValue={IngredientInput}
					setInputValue={setIngredientInput}
					color={theme.palette.primary.main}
					backgroundColor={theme.palette.background.default}
				/>

				<UploadIUmageInput
					imgPreview={imgPreview}
					parentMethod={handleImageChange}
					register={register}
					watch={watch}
					onClear={handleImageClear}
				/>
				<CreateBtn
					createRecipeMutation={
						editId ? updateRecipeMutation : createRecipeMutation
					}
					mode={editId ? CreateRecipeModes.EDIT : CreateRecipeModes.CREATE}
				/>
			</Box>
		</Box>
	);
};
