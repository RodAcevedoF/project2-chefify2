import {
	Box,
	Typography,
	Button,
	CircularProgress,
	Alert,
	useTheme,
} from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useMutation } from '@tanstack/react-query';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import { IngredientService } from '@/features/ingredients/services/ingredient.service';
import normalizeSuggestedRecipeResponse from '@/features/recipes/utils/normalizeSuggestedResponse';
import type { AxiosError } from 'axios';
import { Bot } from 'lucide-react';

export const SuggestRecipeModal = () => {
	const { closeModal, openModal } = useModalContext();
	const theme = useTheme();
	const mutation = useMutation({
		mutationFn: async () => {
			const res = await RecipeService.getSuggestedRecipe();
			return normalizeSuggestedRecipeResponse(res);
		},

		retry: false,
	});

	const handleConfirm = async () => {
		try {
			const data: unknown = await mutation.mutateAsync();
			if (!data) return;
			const dataObj = data as { ingredients?: unknown[] };
			const ingredients = Array.isArray(dataObj.ingredients)
				? dataObj.ingredients
				: [];

			const transformedIngredients = await Promise.all(
				ingredients.map(async (ing: unknown) => {
					const ingredientRef = ing as {
						ingredient: unknown;
						quantity: number;
					};
					const id =
						typeof ingredientRef.ingredient === 'string'
							? ingredientRef.ingredient
							: null;
					if (!id) return ingredientRef;
					try {
						const resp = await IngredientService.getIngredientById(id);
						const ingredientObj = resp.data;
						return {
							ingredient: {
								_id: ingredientObj._id,
								name: ingredientObj.name,
								unit: ingredientObj.unit,
							},
							quantity: ingredientRef.quantity,
						};
					} catch {
						return ingredientRef;
					}
				}),
			);

			const initialData = { ...data, ingredients: transformedIngredients };
			closeModal();
			openModal('recipe', { initialData });
		} catch {
			/* ignore */
		}
	};

	const errorMessage = (() => {
		const err = mutation.error as unknown;
		const axiosErr = err as AxiosError<{ message?: string; error?: string }>;
		return (
			axiosErr?.response?.data?.message ??
			axiosErr?.response?.data?.error ??
			(err as Error)?.message ??
			'Failed to generate recipe'
		);
	})();

	return (
		<Box sx={{ p: 2, width: 500 }}>
			<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
				<Typography variant='h6'>Generate AI recipe</Typography>
				<Bot color={theme.palette.primary.main} />
			</Box>
			<Typography variant='body1' mb={2}>
				Ask the AI to generate a realistic recipe. The generated JSON will be
				loaded into the recipe form so you can review and save it. Do you want
				to continue?
			</Typography>

			{mutation.isError && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{errorMessage}
				</Alert>
			)}

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
				<Button variant='outlined' color='inherit' onClick={() => closeModal()}>
					Cancel
				</Button>
				<Button
					variant='contained'
					onClick={handleConfirm}
					disabled={mutation.status === 'pending'}
					startIcon={
						mutation.status === 'pending' ? (
							<CircularProgress size={18} />
						) : null
					}>
					{mutation.status === 'pending' ? 'Generating...' : 'Generate'}
				</Button>
			</Box>
		</Box>
	);
};

export default SuggestRecipeModal;
