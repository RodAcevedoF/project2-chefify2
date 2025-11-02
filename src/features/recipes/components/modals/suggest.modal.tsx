import { Box, Typography, Alert, useTheme } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useMutation } from '@tanstack/react-query';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import { IngredientService } from '@/features/ingredients/services/ingredient.service';
import normalizeSuggestedRecipeResponse from '@/features/recipes/utils/normalizeSuggestedResponse';
import type { AxiosError } from 'axios';
import { Bot, Brain } from 'lucide-react';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

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
		<Box
			sx={{
				p: 4,
				width: 500,
				background: theme.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
				<Typography variant='h5' fontFamily={'Alegreya'}>
					Generate AI recipe
				</Typography>
				<Bot color={theme.palette.primary.main} width={50} height={50} />
			</Box>
			<Typography variant='body1' mb={2}>
				Ask the AI to generate a new recipe and it will be loaded into the
				recipe form so you can review and save it. Do you want to continue?
			</Typography>

			{mutation.isError && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{errorMessage}
				</Alert>
			)}

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
				<ButtonUsage
					label='Cancel'
					parentMethod={closeModal}
					variant={ButtonVariants.CANCEL}
				/>
				<ButtonUsage
					label={mutation.status === 'pending' ? 'Generating...' : 'Generate'}
					disabled={mutation.status === 'pending'}
					icon={Brain}
					parentMethod={handleConfirm}
				/>
			</Box>
		</Box>
	);
};

export default SuggestRecipeModal;
