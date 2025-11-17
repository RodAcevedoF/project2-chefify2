import { useEffect, useState } from 'react';
import {
	Box,
	TextField,
	Typography,
	useTheme,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonTypes, ButtonVariants } from '@/types/common.types';
import { useResetPassword } from '@/features/auth/hooks/useAuth';
import { Eye, EyeClosed } from 'lucide-react';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { ResetSchema, type ResetData } from '@/types/auth.types';
import { getApiErrorMessage } from '@/lib/getApiErrorMessage';

const useQuery = (search: string) => {
	return new URLSearchParams(search);
};

const ResetPasswordPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const params = useQuery(location.search);
	const initialToken = params.get('token') ?? undefined;
	const initialInvalid = params.get('invalid') === 'true';
	const [tokenParam] = useState<string | undefined>(initialToken);
	const [invalidState] = useState<boolean>(initialInvalid);
	const { openModal } = useModalContext();

	const { logged, isLoading: loggedLoading } = useLoggedContext();

	useEffect(() => {
		if (!loggedLoading && logged) {
			navigate('/recipes', { replace: true });
		}
	}, [logged, loggedLoading, navigate]);

	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
	const [tokenMissingError, setTokenMissingError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetData>({
		resolver: zodResolver(ResetSchema),
		defaultValues: { newPassword: '', repeatNewPassword: '' },
	});

	useEffect(() => {
		if (tokenParam) {
			navigate(location.pathname, { replace: true });
		}
	}, [tokenParam, navigate, location.pathname]);

	const mutation = useResetPassword();

	const onSubmit = (data: ResetData) => {
		const tokenToUse = tokenParam;
		if (!tokenToUse) {
			setTokenMissingError(true);
			return;
		}
		setTokenMissingError(false);
		mutation.mutate(
			{ token: tokenToUse, newPassword: data.newPassword },
			{
				onSuccess: () => {
					navigate('/', {
						replace: true,
						state: {
							toast: {
								message: 'Password changed. Please log in.',
								severity: 'success',
							},
						},
					});
					openModal('auth');
				},
			},
		);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					width: 420,
					p: 3,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					background: theme.palette.background.gradient,
					borderRadius: 3,
				}}>
				<Typography
					variant='h5'
					sx={{ textAlign: 'center', fontFamily: 'Alegreya' }}>
					Reset your password
				</Typography>

				{invalidState && (
					<Typography color='error'>
						This reset link is invalid or expired. You can request a new one.
					</Typography>
				)}

				<TextField
					label='New password'
					size='small'
					type={showPassword ? 'text' : 'password'}
					{...register('newPassword')}
					error={!!errors.newPassword}
					helperText={errors.newPassword?.message}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
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
					label='Repeat new password'
					size='small'
					type={showRepeatPassword ? 'text' : 'password'}
					{...register('repeatNewPassword')}
					error={!!errors.repeatNewPassword}
					helperText={errors.repeatNewPassword?.message}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowRepeatPassword((s) => !s)}
										onMouseDown={(e) => e.preventDefault()}>
										{showRepeatPassword ? (
											<EyeClosed size={18} />
										) : (
											<Eye size={18} />
										)}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>

				{mutation.isError && (
					<Typography color='error'>
						{getApiErrorMessage(mutation.error, 'Could not reset password')}
					</Typography>
				)}

				{tokenMissingError && (
					<Typography color='error'>
						Reset token missing from the URL. Please request a new reset link.
					</Typography>
				)}

				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
					<ButtonUsage
						label='Cancel'
						parentMethod={() => navigate('/')}
						variant={ButtonVariants.CANCEL}
					/>
					{(() => {
						const isPending = mutation.status === 'pending';
						return (
							<ButtonUsage
								label={isPending ? 'Changing...' : 'Change password'}
								type={ButtonTypes.SUBMIT}
								disabled={isPending}
							/>
						);
					})()}
				</Box>

				<Box>
					<Typography
						variant='body2'
						sx={{
							color: 'text.secondary',
							fontWeight: 'bolder',
							mt: 2,
							mb: 1,
						}}>
						If you don't have the email, you can request a new reset.
					</Typography>
					<ButtonUsage
						label='Request new'
						parentMethod={() => openModal('forgotPassword')}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default ResetPasswordPage;
