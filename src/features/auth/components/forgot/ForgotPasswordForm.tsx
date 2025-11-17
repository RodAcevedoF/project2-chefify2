import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonTypes, ButtonVariants } from '@/types/common.types';
import { useForgotPassword } from '@/features/auth/hooks/useAuth';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { ForgotSchema, type ForgotData } from '@/types/auth.types';
import { getApiErrorMessage } from '@/lib/getApiErrorMessage';
import { MailCheck } from 'lucide-react';

export const ForgotPasswordForm = () => {
	const t = useTheme();
	const { closeModal } = useModalContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotData>({ resolver: zodResolver(ForgotSchema) });

	const mutation = useForgotPassword();
	const [done, setDone] = useState(false);
	const isPending = mutation.status === 'pending';

	const onSubmit = (data: ForgotData) => {
		mutation.mutate(data, {
			onSuccess: () => setDone(true),
		});
	};

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
				background: t.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<MailCheck color={t.palette.primary.main} />
				<Typography
					variant='h6'
					sx={{ textAlign: 'center', fontFamily: 'Alegreya' }}>
					Reset password
				</Typography>
			</Box>

			{!done ? (
				<>
					<TextField
						label='Email'
						size='small'
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>

					{mutation.isError && (
						<Typography color='error'>
							{getApiErrorMessage(mutation.error, 'Could not send reset email')}
						</Typography>
					)}

					<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
						<ButtonUsage
							label='Cancel'
							parentMethod={closeModal}
							variant={ButtonVariants.CANCEL}
						/>
						<ButtonUsage
							label={isPending ? 'Sending...' : 'Send email'}
							type={ButtonTypes.SUBMIT}
							disabled={isPending}
						/>
					</Box>
				</>
			) : (
				<>
					<Typography sx={{ color: 'text.secondary', fontWeight: 'bolder' }}>
						If the email exists, we've sent password reset instructions to it.
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
						<ButtonUsage
							label='Close'
							parentMethod={closeModal}
							variant={ButtonVariants.CANCEL}
						/>
					</Box>
				</>
			)}
		</Box>
	);
};

export default ForgotPasswordForm;
