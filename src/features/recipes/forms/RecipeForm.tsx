import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	TextField,
	Typography,
	CircularProgress,
	CardMedia,
	FormControl,
	InputLabel,
	Select,
	Checkbox,
	MenuItem,
	ListItemText,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import {
	RECIPE_CATEGORY_OPTIONS,
	type RecipeDTO,
	type RecipeFormProps,
	RecipeSchema,
} from '@/types/recipe.types';
import { useCreateRecipe } from '../hooks/useCreateRecipe';
import { CirclePlus, Plus } from 'lucide-react';
export const RecipeForm = ({ onSuccess, className = '' }: RecipeFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<RecipeDTO>({
		resolver: zodResolver(RecipeSchema.partial()),
	});

	const createRecipeMutation = useCreateRecipe({
		onSuccess: () => onSuccess?.(),
	});

	const onSubmit = (data: RecipeDTO) => {
		createRecipeMutation.mutate(data);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: { lg: '70vw', md: '80vw', sm: '90vw', xs: '95vw' },
				height: 350,
				borderRadius: 2,
				boxShadow: 3,
				p: 2,
				bgcolor: 'background.default',
			}}
			className={className}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 2,
				}}>
				<Typography variant='h5' fontWeight={700}>
					Create Recipe
				</Typography>
				<CardMedia
					component={'img'}
					image='/logo.png'
					alt='Chef Hat'
					sx={{ width: 50, filter: 'invert(1)' }}
				/>
			</Box>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
				}}>
				<TextField
					label='Title'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ width: 200 }}
					placeholder='Lasagna'
					{...register('title')}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>
				<Controller
					control={control}
					name='instructions'
					render={({ field }) => (
						<Box>
							{(field.value || []).map((inst, idx) => (
								<TextField
									key={idx}
									label={`Instruction ${idx + 1}`}
									value={inst}
									onChange={(e) => {
										const newValue = [...(field.value || [])];
										newValue[idx] = e.target.value;
										field.onChange(newValue);
									}}
								/>
							))}
							<ButtonUsage
								type='button'
								parentMethod={() =>
									field.onChange([...(field.value || []), ''])
								}
								icon={Plus}
								label={'Instructions'}
								extraSx={{
									p: 0.5,
									px: 1,
									fontSize: 10,
									fontWeight: 'bolder',
								}}
								iconSx={{ width: 15, height: 15 }}
							/>
						</Box>
					)}
				/>

				<FormControl sx={{ mb: 2, width: 200 }}>
					<InputLabel id='categories-label'>Categories</InputLabel>
					<Controller
						name='categories'
						control={control}
						render={({ field }) => (
							<Select
								labelId='categories-label'
								multiple
								value={field.value || []}
								onChange={(e) => field.onChange(e.target.value)}
								label='Categories'
								renderValue={(selected) => (selected as string[]).join(', ')}>
								{RECIPE_CATEGORY_OPTIONS.map((cat) => (
									<MenuItem
										key={cat}
										value={cat}
										sx={{
											'&:focus, &.Mui-focusVisible': {
												bgcolor: 'rgba(25,118,210,0.12)',
											},
											'&:hover': { bgcolor: 'rgba(25,118,210,0.06)' },
											'&.Mui-selected': { bgcolor: 'rgba(25,118,210,0.16)' },
											borderRadius: 1,
										}}>
										<Checkbox
											checked={(
												(field.value as (typeof RECIPE_CATEGORY_OPTIONS)[number][]) ||
												[]
											).includes(cat)}
										/>
										<ListItemText primary={cat} />
									</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 1,
						mt: 3,
						width: '80%',
					}}>
					<ButtonUsage
						label={
							createRecipeMutation.isPending ? (
								<CircularProgress size={20} sx={{ color: 'whitesmoke' }} />
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
						Error al iniciar sesión
					</Typography>
				)}
			</Box>
		</Box>
	);
};
