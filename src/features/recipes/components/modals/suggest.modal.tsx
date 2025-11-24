import { Box, Typography, Alert, useTheme } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useState } from 'react';
import { IngredientService } from '@/features/ingredients/services/ingredient.service';
import { useSuggestRecipe } from '@/features/recipes/hooks/useRecipes';
import { Bot, Brain } from 'lucide-react';
import { getApiErrorMessage } from '@/lib/getApiErrorMessage';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import logger from '@/lib/logger';

export const SuggestRecipeModal = () => {
	const { closeModal, openModal } = useModalContext();
	const theme = useTheme();
	const [lastFetched, setLastFetched] = useState<unknown | null>(null);
	const {
		data: suggestedData,
		refetch,
		isFetching,
		isError,
		error,
	} = useSuggestRecipe({ enabled: false });

	const handleConfirm = async () => {
		try {
			const resp = await refetch();
			const data: unknown = resp?.data ?? suggestedData;
			setLastFetched(data ?? null);
			console.debug('[SuggestRecipeModal] suggestion via hook:', {
				resp,
				data,
			});
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
						const ingredientObj = resp;
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
		} catch (err: Error | unknown) {
			logger.error(
				'[SuggestRecipeModal] Error fetching suggested recipe:',
				err instanceof Error
					? { message: err.message, stack: err.stack }
					: undefined,
			);
		}
	};

	const errorMessage = getApiErrorMessage(error, 'Failed to generate recipe');

	return (
		<Box
			sx={{
				p: 4,
				width: { xs: '100%', sm: 500 },
				background: theme.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
				<Typography variant='h5' fontFamily={'Alegreya'}>
					Generate AI recipe
				</Typography>
				<Bot color={theme.palette.primary.main} width={50} height={50} />
			</Box>

			{Boolean(lastFetched) && (
				<Box sx={{ mt: 2 }}>
					<Typography variant='subtitle2'>Response preview</Typography>
					<pre
						style={{
							marginTop: 8,
							maxHeight: 240,
							overflow: 'auto',
							background: String(theme.palette.background.paper),
							padding: 16,
							borderRadius: 4,
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
						}}>
						{JSON.stringify(lastFetched, null, 2)}
					</pre>
				</Box>
			)}
			<Typography variant='body1' mb={2}>
				Ask the AI to generate a new recipe and it will be loaded into the
				recipe form so you can review and save it. Do you want to continue?
			</Typography>

			{isError && (
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
					label={isFetching ? 'Generating...' : 'Generate'}
					disabled={isFetching}
					icon={Brain}
					parentMethod={handleConfirm}
				/>
			</Box>
		</Box>
	);
};

export default SuggestRecipeModal;
