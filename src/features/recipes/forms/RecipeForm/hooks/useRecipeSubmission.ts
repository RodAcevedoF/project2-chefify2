import type {
	RecipeDTO,
	UpdateRecipeDTO,
	RecipeFormProps,
} from '@/types/recipe.types';
import type { IngredientRefDTO } from '@/types/ingredient.type';
import { useCreateRecipe, useUpdateRecipe } from '@/features/recipes/hooks';

interface UseRecipeSubmissionProps {
	onSuccess?: RecipeFormProps['onSuccess'];
	editId?: string;
}

export const useRecipeSubmission = ({
	onSuccess,
	editId,
}: UseRecipeSubmissionProps) => {
	const createRecipeMutation = useCreateRecipe({
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			console.error('Error creating recipe:', error);
		},
	});

	const updateRecipeMutation = useUpdateRecipe({
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			console.error('Error updating recipe:', error);
		},
	});

	const buildPayload = (data: RecipeDTO) => ({
		...data,
		ingredients: (data.ingredients || []).map((ing: IngredientRefDTO) => ({
			ingredient:
				typeof ing.ingredient === 'string'
					? ing.ingredient
					: ing.ingredient?._id || String(ing.ingredient),
			quantity: Number(ing.quantity),
		})),
	});

	const submitWithFile = (payload: RecipeDTO, selectedFile: File) => {
		const fd = new FormData();
		fd.append('payload', JSON.stringify(payload));
		fd.append('mediafile', selectedFile);

		if (editId) {
			// Include _id in payload for update route convenience
			fd.append('_id', editId);
			updateRecipeMutation.mutate(fd as unknown as UpdateRecipeDTO, {
				onSuccess: () => onSuccess?.(editId),
			});
		} else {
			createRecipeMutation.mutate(fd as unknown as RecipeDTO, {
				onSuccess: () => onSuccess?.(),
			});
		}
	};

	const submitWithoutFile = (payload: RecipeDTO) => {
		if (editId) {
			const updatePayload: UpdateRecipeDTO = {
				_id: editId,
				...payload,
			} as UpdateRecipeDTO;
			updateRecipeMutation.mutate(updatePayload, {
				onSuccess: () => {
					onSuccess?.(editId);
				},
			});
		} else {
			createRecipeMutation.mutate(payload, {
				onSuccess: () => onSuccess?.(),
			});
		}
	};

	const handleSubmit = (
		data: RecipeDTO,
		selectedFile: File | null,
		clearSelectedFile: () => void,
	) => {
		const payload = buildPayload(data);

		if (selectedFile) {
			submitWithFile(payload, selectedFile);
			clearSelectedFile();
		} else {
			submitWithoutFile(payload);
		}
	};

	return {
		handleSubmit,
		createRecipeMutation,
		updateRecipeMutation,
		isLoading: createRecipeMutation.isPending || updateRecipeMutation.isPending,
	};
};
