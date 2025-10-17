import { useForm, type Resolver } from 'react-hook-form';
import { Box, TextField, Typography, CardMedia, useTheme } from '@mui/material';
import {
	RECIPE_CATEGORY_OPTIONS,
	RecipeSchema,
	type RecipeDTO,
	type RecipeFormProps,
} from '@/types/recipe.types';
import { useCreateRecipe } from '@/features/recipes/hooks';
import { useState } from 'react';
import CategoriesInput from './components/categories-input';
import InstructionsInput from './components/instructions-input';
import { recipeFormStyles } from './recipe-form.theme';
import ServingInput from './components/serving-input';
import PrepTimeInput from './components/prep-input';
import UploadIUmageInput from './components/upload-image-input';
import CreateBtn from './components/create-recipe';
import IngredientsInput from './components/ingredients-input';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IngredientRefDTO } from '@/types/ingredient.type';

export const RecipeForm = ({ onSuccess, className = '' }: RecipeFormProps) => {
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
	const [imgPreview, setImgPreview] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setImgPreview(url);
		setValue('imgUrl', url);
		setValue('imgPublicId', `local-${Date.now()}`);
	};

	const handleImageClear = () => {
		if (imgPreview?.startsWith('blob:')) URL.revokeObjectURL(imgPreview);
		setValue('imgUrl', '');
		setValue('imgPublicId', '');
		setImgPreview(null);
		const input = document.getElementById(
			'recipe-image-input',
		) as HTMLInputElement | null;
		if (input) input.value = '';
	};

	const createRecipeMutation = useCreateRecipe({
		onSuccess: () => {
			console.log('Recipe created successfully');
			onSuccess?.();
		},
		onError: (error) => {
			console.error('Error creating recipe:', error);
		},
	});

	const onSubmit = (data: RecipeDTO) => {
		const payload = {
			...data,
			ingredients: (data.ingredients || []).map((ing: IngredientRefDTO) => ({
				ingredient:
					typeof ing.ingredient === 'string'
						? ing.ingredient
						: ing.ingredient?._id || String(ing.ingredient),
				quantity: Number(ing.quantity),
			})),
		};
		console.log('Submitting payload:', payload);
		createRecipeMutation.mutate(payload);
	};

	handleSubmit(
		(data) => {
			console.log('Form onSubmit triggered');
			onSubmit(data);
		},
		(errors) => {
			console.log('Form validation errors:', errors);
			if (errors.ingredients) {
				if (Array.isArray(errors.ingredients)) {
					errors.ingredients.forEach((err, idx) => {
						if (err) {
							console.log(`Ingrediente #${idx + 1} inválido:`, err);
						}
					});
				} else {
					console.log('Error en ingredientes:', errors.ingredients);
				}
			}
		},
	);

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
				<CreateBtn createRecipeMutation={createRecipeMutation} />
			</Box>
		</Box>
	);
};
