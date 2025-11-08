import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/features/auth/hooks';
import {
	type AuthFormProps,
	type RegisterFormData,
	RegisterSchema,
} from '@/types/auth.types';
import {
	Box,
	TextField,
	Typography,
	CircularProgress,
	CardMedia,
	useTheme,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ArrowBigRight, Eye, EyeClosed } from 'lucide-react';

export const RegisterForm = ({ onSuccess, className = '' }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
	});

	const theme = useTheme();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
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
				background: theme.palette.background.gradient,
			}}
			className={className}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 2,
				}}>
				<Typography variant='h5' fontFamily={'Alegreya'} fontWeight={700}>
					Register
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
					type={showPassword ? 'text' : 'password'}
					placeholder='********'
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label={
											showPassword ? 'Hide password' : 'Show password'
										}
										onClick={() => setShowPassword((s) => !s)}
										onMouseDown={(e) => e.preventDefault()}>
										{showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>

				<TextField
					label='Confirm Password'
					variant='outlined'
					size='small'
					fullWidth
					sx={{ mb: 2, width: 200 }}
					type={showConfirm ? 'text' : 'password'}
					placeholder='********'
					{...register('confirmPassword')}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label={showConfirm ? 'Hide password' : 'Show password'}
										onClick={() => setShowConfirm((s) => !s)}
										onMouseDown={(e) => e.preventDefault()}>
										{showConfirm ? <EyeClosed size={18} /> : <Eye size={18} />}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
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
								<CircularProgress size={20} sx={{ color: 'whitesmoke' }} />
							) : (
								'Register'
							)
						}
						disabled={registerMutation.isPending}
						icon={ArrowBigRight}
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
