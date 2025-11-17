import {} from '@mui/material';
import ConfirmLayout from '@/features/common/components/modals/ConfirmLayout';
import { getApiErrorMessage } from '@/lib/getApiErrorMessage';
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
		<>
			<ConfirmLayout
				title='Delete user'
				message={
					<>
						Are you sure you want to delete "{params?.name ?? 'this user'}"?
						This action cannot be undone.
					</>
				}
				error={
					deleteMutation.isError
						? getApiErrorMessage(
								deleteMutation.error,
								'An error occurred while deleting the user.',
						  )
						: undefined
				}>
				<>
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
				</>
			</ConfirmLayout>
		</>
	);
};

export default DeleteUserModal;
