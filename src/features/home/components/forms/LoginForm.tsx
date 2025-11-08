import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/features/auth/hooks';
import {
	LoginSchema,
	type AuthFormProps,
	type LoginParams as LoginFormProps,
} from '@/types/auth.types';
import { ArrowBigRight } from 'lucide-react';
import {
	Box,
	TextField,
	Typography,
	CardMedia,
	useTheme,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonTypes } from '@/types/common.types';
import { Eye, EyeClosed } from 'lucide-react';
import { useModalContext } from '@/contexts/modalContext/modal.context';

export const LoginForm = ({ onSuccess, className = '' }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
	});
	const [showPassword, setShowPassword] = useState(false);
	const theme = useTheme();

	const loginMutation = useLogin({
		onSuccess: () => onSuccess?.(),
	});

	const { openModal } = useModalContext();

	const onSubmit = (data: LoginFormProps) => {
		loginMutation.mutate(data);
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
					Login
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
					helperText={errors.password ? 'Invalid password' : ''}
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
						label={'Login'}
						disabled={loginMutation.isPending}
						type={ButtonTypes.SUBMIT}
						icon={ArrowBigRight}
					/>
					<ButtonUsage
						label={'Forgot?'}
						parentMethod={() => openModal('forgotPassword')}
						variant={undefined}
					/>
				</Box>
				{loginMutation.isError && (
					<Typography color='error' mt={2}>
						Error al iniciar sesión
					</Typography>
				)}
			</Box>
		</Box>
	);
};
