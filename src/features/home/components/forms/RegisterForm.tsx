import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/features/auth/hooks/useRegister';
import {
	type AuthFormProps,
	type RegisterFormData,
	RegisterSchema,
} from '@/types/auth.types';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';

export const RegisterForm = ({ onSuccess, className = '' }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
	});

	const registerMutation = useRegister({
		onSuccess: () => onSuccess?.(),
	});

	const onSubmit = (data: RegisterFormData) => {
		registerMutation.mutate(data);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: 300,
				height: 400,
				borderRadius: 2,
				boxShadow: 3,
				p: 3,
				bgcolor: 'background.default',
			}}
			className={className}>
			<Typography variant='h5' fontWeight={700} mb={3}>
				Register
			</Typography>
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
					label='Name'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ mb: 2, width: 200 }}
					placeholder='John Doe'
					{...register('name')}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label='Email'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ mb: 2, width: 200 }}
					placeholder='chef@gourmet.es'
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					label='Password'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ mb: 2, width: 200 }}
					type='password'
					placeholder='********'
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
				<TextField
					label='Confirm Password'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ mb: 2, width: 200 }}
					type='password'
					placeholder='********'
					{...register('confirmPassword')}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
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
							registerMutation.isPending ? (
								<CircularProgress size={20} color='inherit' />
							) : (
								'Register'
							)
						}
						disabled={registerMutation.isPending}
					/>
				</Box>
				{registerMutation.isError && (
					<Typography color='error' mt={2}>
						Error al registrar
					</Typography>
				)}
			</Box>
		</Box>
	);
};
