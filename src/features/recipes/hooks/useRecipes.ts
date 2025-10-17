import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import type { AxiosError } from 'axios';
import type { Recipe, UpdateRecipeDTO, RecipeDTO } from '@/types/recipe.types';
import type { UseCommonOptions } from '@/types/common.types';
import type { QueryParams, CommonResponse } from '@/types/common.types';

export const recipesKeys = {
	all: ['recipes'] as const,
	lists: (params?: QueryParams) =>
		[...recipesKeys.all, 'list', params] as const,
	details: () => [...recipesKeys.all, 'detail'] as const,
	detail: (id: string) => [...recipesKeys.details(), id] as const,
};

export const useGetRecipes = (params: QueryParams = {}) => {
	return useQuery<CommonResponse<Recipe[]>, AxiosError, Recipe[]>({
		queryKey: recipesKeys.lists(params),
		queryFn: () => RecipeService.getRecipes(params),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
	});
};

export const useGetRecipeByID = (id?: string) => {
	return useQuery<CommonResponse<Recipe>, AxiosError, Recipe>({
		queryKey: recipesKeys.detail(id ?? ''),
		queryFn: () => RecipeService.getRecipeById(id as string),
		enabled: Boolean(id),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
	});
};

export const useCreateRecipe = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, RecipeDTO>({
		mutationKey: ['recipes', 'create'],
		mutationFn: (data) => RecipeService.createRecipe(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipesKeys.all });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error creating recipe:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};

export const useUpdateRecipe = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, UpdateRecipeDTO>({
		mutationKey: ['recipes', 'update'],
		mutationFn: (data) => RecipeService.updatedRecipe(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipesKeys.all });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error updating recipe:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};

export const useDeleteRecipe = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, { id: string }>({
		mutationKey: ['recipes', 'delete'],
		mutationFn: ({ id }) => RecipeService.deleteRecipe(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipesKeys.all });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error deleting recipe:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};

export const useSuggestRecipe = () => {
	return useQuery<RecipeDTO, AxiosError>({
		queryKey: ['recipe', 'suggestion'],
		queryFn: () => RecipeService.getSuggestedRecipe(),
		retry: false,
	});
};
