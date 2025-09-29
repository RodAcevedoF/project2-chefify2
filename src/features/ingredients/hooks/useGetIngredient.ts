import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { AxiosError } from 'axios';
import type { QueryParams, CommonResponse } from '@/types/common.types';
import { IngredientService } from '../services/ingredient.service';
import type { Ingredient } from '@/types/ingredient.type';

export const ingredientKeys = {
	all: ['ingredients'] as const,
	lists: (params: QueryParams | undefined) =>
		[...ingredientKeys.all, 'list', params] as const,
	details: () => [...ingredientKeys.all, 'detail'] as const,
	detail: (id: string) => [...ingredientKeys.details(), id] as const,
};
export const useGetIngredients = (
	params: QueryParams = {},
	options?: UseQueryOptions<
		CommonResponse<Ingredient[]>,
		AxiosError,
		Ingredient[]
	>,
) => {
	return useQuery<CommonResponse<Ingredient[]>, AxiosError, Ingredient[]>({
		queryKey: ingredientKeys.lists(params),
		queryFn: () => IngredientService.getIngredient(params),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};

export const useGetIngredientByID = (
	id: string | undefined,
	options?: UseQueryOptions<CommonResponse<Ingredient>, AxiosError, Ingredient>,
) => {
	return useQuery<CommonResponse<Ingredient>, AxiosError, Ingredient>({
		queryKey: ingredientKeys.detail(id ?? ''),
		queryFn: () => IngredientService.getIngredientById(id as string),
		enabled: Boolean(id),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};
