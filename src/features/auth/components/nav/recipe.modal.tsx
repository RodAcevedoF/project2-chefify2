import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { RecipeForm } from '@/features/recipes/forms/RecipeForm';

export const RecipeModal = () => {
	const { closeModal } = useModalContext();
	const nav = useNavigate();

	const handleRecipeMutationSuccess = () => {
		closeModal();
		nav('/recipes');
	};

	return (
		<>
			<RecipeForm onSuccess={handleRecipeMutationSuccess} />
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
				<Button
					variant='text'
					sx={{ fontWeight: 900, fontSize: 16 }}
					onClick={() => closeModal()}>
					Cancel
				</Button>
			</Box>
		</>
	);
};

export default RecipeModal;
