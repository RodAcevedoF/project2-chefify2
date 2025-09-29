import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IngredientService } from '@/features/ingredients/services/ingredient.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';

export const useCreateIngredient = (options: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, { id: string }>({
		mutationKey: ['ingredients', 'delete'],
		mutationFn: ({ id }): Promise<void> => IngredientService.delete(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['ingredients'],
				exact: false,
			});
			options?.onSuccess?.(data);
		},
		onError: (axiosError) => {
			console.error('Error creating ingredient:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
