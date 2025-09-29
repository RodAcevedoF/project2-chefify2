import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IngredientService } from '@/features/ingredients/services/ingredient.service';
import type { AxiosError } from 'axios';

import type { UseCommonOptions } from '@/types/common.types';
import type { IngredientDTO } from '@/types/ingredient.type';

export const useCreateIngredient = (options: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();

	return useMutation<void, AxiosError, IngredientDTO>({
		mutationKey: ['ingredients', 'create'],

		mutationFn: (data: IngredientDTO): Promise<void> =>
			IngredientService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ingredients', 'create'] });
			options?.onSuccess?.();
		},
		onError: (axiosError) => {
			console.error('Error creating ingredient:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
