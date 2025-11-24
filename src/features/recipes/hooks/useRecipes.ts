import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import type { AxiosError } from 'axios';
import type { Recipe, UpdateRecipeDTO, RecipeDTO } from '@/types/recipe.types';
import type { UseCommonOptions } from '@/types/common.types';
import type { QueryParams } from '@/types/common.types';

const recipesKeys = ['recipes', 'all', 'recipe'];

export const useGetRecipes = (params: QueryParams = {}) => {
	return useQuery<Recipe[], AxiosError, Recipe[]>({
		queryKey: [...recipesKeys, JSON.stringify(params)],
		queryFn: () => RecipeService.getRecipes(params),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};

export const useGetRecipeByID = (id?: string) => {
	return useQuery<Recipe, AxiosError, Recipe>({
		queryKey: [...recipesKeys, id],
		queryFn: () => RecipeService.getRecipeById(id as string),
		enabled: Boolean(id),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};

export const useCreateRecipe = (options?: UseCommonOptions<void>) => {
	const queryClient = useQueryClient();
	return useMutation<void, AxiosError, RecipeDTO | FormData>({
		mutationKey: ['recipes', 'create'],
		mutationFn: (data) => RecipeService.createRecipe(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipesKeys });
			queryClient.invalidateQueries({ queryKey: ['user', 'operations'] });
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
	return useMutation<void, AxiosError, UpdateRecipeDTO | FormData>({
		mutationKey: [...recipesKeys, 'update'],
		mutationFn: (data) => RecipeService.updatedRecipe(data),
		onSuccess: (_data, variables) => {
			let id: string | undefined;
			if (variables instanceof FormData) {
				id = (variables.get('_id') as string) || undefined;
			} else {
				id = variables?._id;
			}
			if (id) {
				queryClient.invalidateQueries({
					queryKey: [...recipesKeys, id],
				});
			}
			queryClient.invalidateQueries({ queryKey: recipesKeys });
			queryClient.invalidateQueries({ queryKey: ['user', 'operations'] });
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
		mutationKey: [...recipesKeys, 'delete'],
		mutationFn: ({ id }) => RecipeService.deleteRecipe(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipesKeys });
			queryClient.invalidateQueries({ queryKey: ['user', 'operations'] });
			options?.onSuccess?.();
		},
		onError: (err) => {
			console.error('Error deleting recipe:', err);
			options?.onError?.(err as AxiosError);
		},
	});
};

export const useSuggestRecipe = (
	options?: Omit<
		UseQueryOptions<RecipeDTO, AxiosError, RecipeDTO>,
		'queryKey' | 'queryFn'
	>,
) => {
	return useQuery<RecipeDTO, AxiosError, RecipeDTO>({
		queryKey: [...recipesKeys, 'suggestion'],
		queryFn: () => RecipeService.getSuggestedRecipe(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
		...(options ?? {}),
	});
};
