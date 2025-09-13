import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';
import type { UpdateRecipeDTO } from '@/types/recipe.types';

export const useUpdateRecipe = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();

	return useMutation<void, AxiosError, UpdateRecipeDTO>({
		mutationKey: ['recipes', 'update'],

		mutationFn: (data: UpdateRecipeDTO): Promise<void> =>
			RecipeService.updatedRecipe(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
			options?.onSuccess?.();
		},
		onError: (axiosError) => {
			console.error('Error updating recipe:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
