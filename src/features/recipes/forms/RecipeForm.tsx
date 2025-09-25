import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBigRight } from 'lucide-react';
import {
	Box,
	TextField,
	Typography,
	CircularProgress,
	CardMedia,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import {
	RecipeSchema,
	type RecipeDTO,
	type RecipeFormProps,
} from '@/types/recipe.types';
import { useCreateRecipe } from '../hooks/useCreateRecipe';

export const RecipeForm = ({ onSuccess, className = '' }: RecipeFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(RecipeSchema),
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
				width: 300,
				height: 350,
				borderRadius: 2,
				boxShadow: 3,
				p: 3,
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
					sx={{ mb: 2, width: 200 }}
					placeholder='chef@gourmet.es'
					{...register('title')}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>
				<TextField
					label='Instructions'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ mb: 2, width: 200 }}
					type=''
					{...register('instructions')}
					error={!!errors.instructions}
					helperText={errors.instructions?.message}
				/>
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
								'Login'
							)
						}
						disabled={createRecipeMutation.isPending}
						type='submit'
					/>
					<ArrowBigRight
						style={{
							fontSize: 24,
							color: 'whitesmoke',
							animation: 'ping 1s infinite',
						}}
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
