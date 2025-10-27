import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import type { Recipe } from '@/types/recipe.types';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { RecipeForm } from '@/features/recipes/forms/RecipeForm/RecipeForm';

export const RecipeModal = (props: Record<string, unknown> = {}) => {
	const { closeModal } = useModalContext();
	const nav = useNavigate();
	const initialData = props.initialData as unknown as
		| Partial<Recipe>
		| undefined;

	const handleRecipeMutationSuccess = (id?: string) => {
		closeModal();
		if (id) nav(`/recipes/${id}`);
		else nav('/recipes');
	};

	return (
		<>
			<RecipeForm
				onSuccess={handleRecipeMutationSuccess}
				initialData={initialData}
			/>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
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
