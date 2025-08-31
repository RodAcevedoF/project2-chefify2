import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { RecipeService } from '@/services/recipe.service';
import type { AxiosError } from 'axios';
import type { Recipe } from '@/types/recipe.types';
import type { QueryParams, CommonResponse } from '@/types/common.types';

export const recipeKeys = {
	all: ['recipes'] as const,
	lists: (params: QueryParams | undefined) =>
		[...recipeKeys.all, 'list', params] as const,
	details: () => [...recipeKeys.all, 'detail'] as const,
	detail: (id: string) => [...recipeKeys.details(), id] as const,
};
export const useGetRecipes = (
	params: QueryParams = {},
	options?: UseQueryOptions<CommonResponse<Recipe[]>, AxiosError, Recipe[]>,
) => {
	return useQuery<CommonResponse<Recipe[]>, AxiosError, Recipe[]>({
		queryKey: recipeKeys.lists(params),
		queryFn: () => RecipeService.getRecipes(params),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};

export const useGetRecipeByID = (
	id: string | undefined,
	options?: UseQueryOptions<CommonResponse<Recipe>, AxiosError, Recipe>,
) => {
	return useQuery<CommonResponse<Recipe>, AxiosError, Recipe>({
		queryKey: recipeKeys.detail(id ?? ''),
		queryFn: () => RecipeService.getRecipeById(id as string),
		enabled: Boolean(id),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};
