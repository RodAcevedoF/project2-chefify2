import { useHandleNavigate } from '@/utils/useHandleNavigate';
import { Button, Box } from '@mui/material';
import type { Recipe } from '@/types/recipe.types';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { RecipeForm } from '@/features/recipes/forms/RecipeForm/RecipeForm';

export const RecipeModal = (props: Record<string, unknown> = {}) => {
	const { closeModal } = useModalContext();
	const nav = useHandleNavigate((id?: string) =>
		id ? `/recipes/${id}` : '/recipes',
	);
	const initialData = props.initialData as unknown as
		| Partial<Recipe>
		| undefined;

	const handleRecipeMutationSuccess = (id?: string) => {
		closeModal();
		nav(id);
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
