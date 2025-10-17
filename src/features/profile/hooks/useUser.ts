import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseQueryOptions,
} from '@tanstack/react-query';
import { UserService } from '@/features/profile/services/user.service';
import type { AxiosError } from 'axios';
import type { User, UserDTO } from '@/types/user.types';
import type { Recipe } from '@/types/recipe.types';
import type { CommonResponse } from '@/types/common.types';

export const userKeys = {
	all: ['user'] as const,
	lists: () => [...userKeys.all, 'list'] as const,
	details: () => [...userKeys.all, 'detail'] as const,
	detail: (id: string) => [...userKeys.details(), id] as const,
	me: () => [...userKeys.all, 'me'] as const,
};

export const useGetUser = (
	options?: UseQueryOptions<CommonResponse<User>, AxiosError, User>,
) => {
	return useQuery<CommonResponse<User>, AxiosError, User>({
		queryKey: userKeys.lists(),
		queryFn: () => UserService.getUsers(),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};

export const useGetUserByEmail = (
	email: string | undefined,
	options?: UseQueryOptions<CommonResponse<User>, AxiosError, User>,
) => {
	return useQuery<CommonResponse<User>, AxiosError, User>({
		queryKey: userKeys.detail(email ?? ''),
		queryFn: () => UserService.getUserByEmail(email as string),
		enabled: Boolean(email),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};

export const useGetOwnRecipes = (
	options?: UseQueryOptions<CommonResponse<Recipe[]>, AxiosError, Recipe[]>,
) => {
	return useQuery<CommonResponse<Recipe[]>, AxiosError, Recipe[]>({
		queryKey: ['user', 'my-recipes'],
		queryFn: () => UserService.getOwnRecipes(),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};

export const useGetSavedRecipes = (
	options?: UseQueryOptions<CommonResponse<Recipe[]>, AxiosError, Recipe[]>,
) => {
	return useQuery<CommonResponse<Recipe[]>, AxiosError, Recipe[]>({
		queryKey: ['user', 'saved-recipes'],
		queryFn: () => UserService.getSavedRecipes(),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
		...options,
	});
};

export const useUpdateUser = () => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, UserDTO>({
		mutationFn: (payload) => UserService.updateUser(payload),
		onSuccess: () => {
			// invalidate user-related queries so UI refreshes
			qc.invalidateQueries({ queryKey: userKeys.all });
			qc.invalidateQueries({ queryKey: ['user', 'me'] });
		},
	});
};

export const useDeleteUser = () => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, void>({
		mutationFn: () => UserService.deleteUser(),
		onSuccess: () => {
			qc.clear();
		},
	});
};

export const useSaveRecipe = () => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, string>({
		mutationFn: (recipeId) => UserService.saveRecipe(recipeId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
		},
	});
};

export const useDeleteSavedRecipe = () => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, string>({
		mutationFn: (recipeId) => UserService.deleteSavedRecipe(recipeId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
		},
	});
};
