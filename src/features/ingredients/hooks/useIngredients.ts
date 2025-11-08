import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IngredientService } from '@/features/ingredients/services/ingredient.service';
import type { AxiosError } from 'axios';
import type { QueryParams, UseCommonOptions } from '@/types/common.types';
import type { Ingredient, IngredientDTO } from '@/types/ingredient.type';

export const ingredientKeys = {
	all: ['ingredients'] as const,
	lists: (params?: QueryParams) =>
		[...ingredientKeys.all, 'list', params] as const,
	details: () => [...ingredientKeys.all, 'detail'] as const,
	detail: (id: string) => [...ingredientKeys.details(), id] as const,
};

import type { UseQueryOptions } from '@tanstack/react-query';

export const useGetIngredients = (
	params: QueryParams = {},
	options?: UseQueryOptions<Ingredient[], AxiosError, Ingredient[]>,
) => {
	return useQuery<Ingredient[], AxiosError, Ingredient[]>({
		queryKey: [...ingredientKeys.all, 'list', JSON.stringify(params)],
		queryFn: () => IngredientService.getIngredient(params),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
		...options,
	});
};

export const useGetIngredientByID = (id?: string) => {
	return useQuery<Ingredient, AxiosError, Ingredient>({
		queryKey: ingredientKeys.detail(id ?? ''),
		queryFn: () => IngredientService.getIngredientById(id as string),
		enabled: Boolean(id),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};

export const useCreateIngredient = (options?: UseCommonOptions<void>) => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, IngredientDTO>({
		mutationKey: ['ingredients', 'create'],
		mutationFn: (data) => IngredientService.create(data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ingredientKeys.all });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error creating ingredient:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};

export const useUpdateIngredient = (options?: UseCommonOptions<void>) => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, IngredientDTO>({
		mutationKey: ['ingredients', 'update'],
		mutationFn: (data) => IngredientService.update(data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ingredientKeys.all });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error updating ingredient:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};

export const useDeleteIngredient = (options?: UseCommonOptions<void>) => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, { id: string }>({
		mutationKey: ['ingredients', 'delete'],
		mutationFn: ({ id }) => IngredientService.delete(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ingredientKeys.all });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error deleting ingredient:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};
