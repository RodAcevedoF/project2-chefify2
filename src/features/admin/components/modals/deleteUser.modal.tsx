import { Box, Typography, useTheme } from '@mui/material';
import type { AxiosError } from 'axios';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useDeleteUser } from '@/features/admin/hooks/useAdmin';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

type Params = {
	id?: string;
	name?: string;
};

export const DeleteUserModal = () => {
	const { closeModal, modalParams } = useModalContext();
	const params = modalParams as Params | undefined;
	const theme = useTheme();
	const deleteMutation = useDeleteUser({
		onSuccess: () => {
			closeModal();
		},
	});

	const handleConfirm = () => {
		if (!params?.id) return;
		deleteMutation.mutate(params.id);
	};

	return (
		<Box
			sx={{
				p: 4,
				minWidth: 320,
				background: theme.palette.background.gradient,
				borderRadius: 2,
			}}>
			<Typography variant='h5' sx={{ mb: 3, fontFamily: 'Alegreya' }}>
				Delete user
			</Typography>
			<Typography sx={{ mb: 2, fontSize: 18, fontWeight: 500 }}>
				Are you sure you want to delete "{params?.name ?? 'this user'}"? This
				action cannot be undone.
			</Typography>
			{deleteMutation.isError && (
				<Typography variant='body2' color='error' mb={2}>
					{(deleteMutation.error as unknown as AxiosError<{ message?: string }>)
						?.response?.data?.message ||
						(deleteMutation.error as unknown as Error)?.message ||
						'An error occurred while deleting the user.'}
				</Typography>
			)}
			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
				<ButtonUsage
					variant={ButtonVariants.OUTLINED}
					label='Cancel'
					parentMethod={closeModal}
				/>

				<ButtonUsage
					label='Delete'
					variant={ButtonVariants.CANCEL}
					disabled={deleteMutation.status === 'pending'}
					parentMethod={handleConfirm}
				/>
			</Box>
		</Box>
	);
};

export default DeleteUserModal;
