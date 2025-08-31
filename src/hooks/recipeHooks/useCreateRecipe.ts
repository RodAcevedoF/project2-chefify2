import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeService } from '@/services/recipe.service';
import type { AxiosError } from 'axios';
import type { Recipe, RecipeDTO } from '@/types/recipe.types';
import type { UseCommonOptions } from '@/types/common.types';

export const useCreateRecipe = (options: UseCommonOptions<Recipe>) => {
	const queryClient = useQueryClient();

	return useMutation<Recipe, AxiosError, RecipeDTO>({
		mutationKey: ['recipes', 'create'],

		mutationFn: (data: RecipeDTO): Promise<Recipe> =>
			RecipeService.createRecipe(data),

		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['recipes', 'create'] });
			options?.onSuccess?.(data);
		},
		onError: (axiosError) => {
			console.error('Error creating recipe:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
