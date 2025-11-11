import ConfirmLayout from '@/features/common/components/modals/ConfirmLayout';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useDeleteRecipe } from '@/features/recipes/hooks';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

type DeleteModalProps = {
	id?: string;
	title?: string;
};

export const DeleteModal = ({ id, title }: DeleteModalProps = {}) => {
	const { closeModal } = useModalContext();
	const navigate = useNavigate();

	const deleteMutation = useDeleteRecipe({
		onSuccess: () => {
			closeModal();
			navigate('/recipes');
		},
	});

	const handleConfirm = () => {
		if (!id) return;
		deleteMutation.mutate({ id });
	};

	return (
		<ConfirmLayout
			title='Delete recipe'
			message={
				<>
					Are you sure you want to delete "{title ?? 'this recipe'}"? This
					action cannot be undone.
				</>
			}
			error={
				deleteMutation.isError
					? (
							deleteMutation.error as unknown as AxiosError<{
								message?: string;
							}>
					  )?.response?.data?.message ||
					  (deleteMutation.error as unknown as Error)?.message ||
					  'An error occurred while deleting the recipe.'
					: undefined
			}>
			<>
				<ButtonUsage
					label='Cancel'
					variant={ButtonVariants.OUTLINED}
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
	);
};

export default DeleteModal;
