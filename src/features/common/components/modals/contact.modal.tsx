import { type FC, useState } from 'react';
import { Box, Typography, TextField, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonTypes, ButtonVariants } from '@/types/common.types';
import Toast from '@/features/common/components/toasts/Toast';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useContact } from '@/features/home/hooks/useContact';
import { getApiErrorMessage } from '@/lib/getApiErrorMessage';

const ContactSchema = z.object({
	name: z.string().min(1, 'Please enter your name'),
	replyTo: z.email('Enter a valid email'),
	message: z.string().min(5, 'Message is too short'),
});

type ContactData = z.infer<typeof ContactSchema>;

const ContactModal: FC = () => {
	const theme = useTheme();
	const { closeModal } = useModalContext();
	const [toastOpen, setToastOpen] = useState(false);
	const mutation = useContact({
		onSuccess: () => {
			setToastOpen(true);
			reset();
			setTimeout(() => {
				setToastOpen(false);
				closeModal();
			}, 1200);
		},
	});
	const sending = mutation.status === 'pending';

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactData>({ resolver: zodResolver(ContactSchema) });

	const onSubmit = (data: ContactData) => {
		mutation.mutate(data);
	};

	return (
		<Box
			sx={{
				width: { xs: 290, sm: 520 },
				p: 3,

				background: theme.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Typography variant='h6' sx={{ mb: 2, fontFamily: 'Alegreya' }}>
				Contact us
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}>
				<TextField
					label='Your name'
					size='small'
					{...register('name')}
					error={!!errors.name}
					helperText={errors.name?.message as string | undefined}
					slotProps={{
						input: {
							sx: {
								color: theme.palette.primary.main,
								fontWeight: 'bolder',
							},
						},
					}}
				/>
				<TextField
					label='Your email'
					size='small'
					{...register('replyTo')}
					error={!!errors.replyTo}
					helperText={errors.replyTo?.message as string | undefined}
					slotProps={{
						input: {
							sx: { color: theme.palette.primary.main, fontWeight: 'bolder' },
						},
					}}
				/>
				<TextField
					label='Message'
					multiline
					minRows={4}
					{...register('message')}
					error={!!errors.message}
					helperText={errors.message?.message as string | undefined}
					slotProps={{
						input: {
							sx: { color: theme.palette.primary.main, fontWeight: 'bolder' },
						},
					}}
				/>

				{mutation.isError && (
					<Typography color='error'>
						{getApiErrorMessage(mutation.error, 'Could not send message')}
					</Typography>
				)}

				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
					<ButtonUsage
						label='Cancel'
						variant={ButtonVariants.CANCEL}
						parentMethod={closeModal}
					/>
					<ButtonUsage
						label={sending ? 'Sending...' : 'Send'}
						type={ButtonTypes.SUBMIT}
						variant={ButtonVariants.DEFAULT}
						disabled={sending}
					/>
				</Box>
			</Box>

			<Toast
				open={toastOpen}
				message='Message sent. Thank you!'
				severity='success'
				onClose={() => setToastOpen(false)}
			/>
		</Box>
	);
};

export default ContactModal;
