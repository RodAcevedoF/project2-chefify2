import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/features/auth/hooks/useLogin';
import {
	LoginSchema,
	type AuthFormProps,
	type LoginParams as LoginFormProps,
} from '@/types/auth.types';
import { ArrowBigRight } from 'lucide-react';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';

export const LoginForm = ({ onSuccess, className = '' }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
	});

	const loginMutation = useLogin({
		onSuccess: () => onSuccess?.(),
	});

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
				bgcolor: 'background.default',
			}}
			className={className}>
			<Typography variant='h5' fontWeight={700} mb={3}>
				Login
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
					helperText={errors.password ? 'Invalid password' : ''}
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
							loginMutation.isPending ? (
								<CircularProgress size={20} color='inherit' />
							) : (
								'Login'
							)
						}
						disabled={loginMutation.isPending}
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
				{loginMutation.isError && (
					<Typography color='error' mt={2}>
						Error al iniciar sesión
					</Typography>
				)}
			</Box>
		</Box>
	);
};
