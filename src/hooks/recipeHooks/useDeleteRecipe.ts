import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeService } from '@/services/recipe.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';

export const useDelete = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, { id: string }>({
		mutationKey: ['recipe', 'delete'],
		mutationFn: ({ id }): Promise<void> => RecipeService.deleteRecipe(id),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'], exact: false });
			options?.onSuccess?.();
		},

		onError: (axiosError) => {
			console.error('Error deleting recipe:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
