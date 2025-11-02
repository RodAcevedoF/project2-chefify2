import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Box,
	TextField,
	Typography,
	useTheme,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { ButtonVariants, ButtonTypes } from '@/types/common.types';
import { z } from 'zod';
import { useChangePassword } from '@/features/auth/hooks/useAuth';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Eye, EyeClosed } from 'lucide-react';
import { PasswordChangeSchema } from '@/types/auth.types';

export type PasswordChangeData = z.infer<typeof PasswordChangeSchema>;

export const SettingsForm = ({ onCancel }: { onCancel?: () => void } = {}) => {
	const theme = useTheme();

	const modal = useModalContext();
	const close = onCancel ?? modal.closeModal;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordChangeData>({
		resolver: zodResolver(PasswordChangeSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			repeatNewPassword: '',
		},
	});

	const mutation = useChangePassword();

	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showRepeat, setShowRepeat] = useState(false);

	const onSubmit = (data: PasswordChangeData) => {
		mutation.mutate(
			{ currentPassword: data.currentPassword, newPassword: data.newPassword },
			{
				onSuccess: () => {
					close();
				},
			},
		);
	};

	const isPending = mutation.status === 'pending';

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: 360,
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				background: theme.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box sx={{ textAlign: 'center', mb: 1 }}>
				<Typography variant='h6' fontFamily={'Alegreya'}>
					Change Password
				</Typography>
			</Box>

			<TextField
				label='Current Password'
				type={showCurrent ? 'text' : 'password'}
				size='small'
				{...register('currentPassword')}
				error={Boolean(errors.currentPassword)}
				helperText={errors.currentPassword?.message}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label={
										showCurrent
											? 'Hide current password'
											: 'Show current password'
									}
									onClick={() => setShowCurrent((s) => !s)}
									onMouseDown={(e) => e.preventDefault()}>
									{showCurrent ? <EyeClosed size={18} /> : <Eye size={18} />}
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			<TextField
				label='New Password'
				type={showNew ? 'text' : 'password'}
				size='small'
				{...register('newPassword')}
				error={Boolean(errors.newPassword)}
				helperText={errors.newPassword?.message}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label={
										showNew ? 'Hide new password' : 'Show new password'
									}
									onClick={() => setShowNew((s) => !s)}
									onMouseDown={(e) => e.preventDefault()}>
									{showNew ? <EyeClosed size={18} /> : <Eye size={18} />}
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			<TextField
				label='Repeat New Password'
				type={showRepeat ? 'text' : 'password'}
				size='small'
				{...register('repeatNewPassword')}
				error={Boolean(errors.repeatNewPassword)}
				helperText={errors.repeatNewPassword?.message}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label={
										showRepeat ? 'Hide repeat password' : 'Show repeat password'
									}
									onClick={() => setShowRepeat((s) => !s)}
									onMouseDown={(e) => e.preventDefault()}>
									{showRepeat ? <EyeClosed size={18} /> : <Eye size={18} />}
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			{mutation.isError && (
				<Typography color='error' variant='body2'>
					{(
						mutation.error as unknown as {
							response?: { data?: { message?: string } };
						}
					)?.response?.data?.message || 'Unable to change password'}
				</Typography>
			)}

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
				<ButtonUsage
					label='Cancel'
					parentMethod={close}
					variant={ButtonVariants.CANCEL}
				/>

				<ButtonUsage
					label={isPending ? 'Changing...' : 'Change Password'}
					type={ButtonTypes.SUBMIT}
					disabled={isPending}
				/>
			</Box>
		</Box>
	);
};

export default SettingsForm;
