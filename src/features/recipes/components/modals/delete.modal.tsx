import { Box, Typography, Button } from '@mui/material';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useDeleteRecipe } from '@/features/recipes/hooks';

type Props = {
	id?: string;
	title?: string;
};

export const DeleteModal = ({ id, title }: Props = {}) => {
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
		<Box sx={{ p: 2, minWidth: 320 }}>
			<Typography variant='h6' mb={1}>
				Delete recipe
			</Typography>
			<Typography variant='body2' mb={2}>
				Are you sure you want to delete "{title ?? 'this recipe'}"? This action
				cannot be undone.
			</Typography>
			{deleteMutation.isError && (
				<Typography variant='body2' color='error' mb={2}>
					{(deleteMutation.error as unknown as AxiosError<{ message?: string }>)
						?.response?.data?.message ||
						(deleteMutation.error as unknown as Error)?.message ||
						'An error occurred while deleting the recipe.'}
				</Typography>
			)}
			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
				<Button variant='outlined' color='inherit' onClick={() => closeModal()}>
					Cancel
				</Button>
				<Button
					variant='contained'
					color='error'
					onClick={handleConfirm}
					disabled={deleteMutation.status === 'pending'}>
					Delete
				</Button>
			</Box>
		</Box>
	);
};

export default DeleteModal;
