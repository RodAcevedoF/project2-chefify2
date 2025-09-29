import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import type { AxiosError } from 'axios';
import type { RecipeDTO } from '@/types/recipe.types';
import type { UseCommonOptions } from '@/types/common.types';

export const useCreateRecipe = (options: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();

	return useMutation<void, AxiosError, RecipeDTO>({
		mutationKey: ['recipes', 'create'],

		mutationFn: (data: RecipeDTO): Promise<void> =>
			RecipeService.createRecipe(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes', 'create'] });
			options?.onSuccess?.();
		},
		onError: (axiosError) => {
			console.error('Error creating recipe:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
