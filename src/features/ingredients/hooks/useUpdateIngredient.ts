import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';
import { IngredientService } from '../services/ingredient.service';
import type { IngredientDTO } from '@/types/ingredient.type';

export const useUpdateIngredient = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, IngredientDTO>({
		mutationKey: ['ingredients', 'update'],
		mutationFn: (data: IngredientDTO): Promise<void> =>
			IngredientService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ingredients'] });
			options?.onSuccess?.();
		},
		onError: (axiosError) => {
			console.error('Error updating ingredient:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
