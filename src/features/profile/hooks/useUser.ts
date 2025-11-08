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

export const useGetUser = (
	options?: UseQueryOptions<User, AxiosError, User>,
) => {
	return useQuery<User, AxiosError, User>({
		queryKey: ['me'],
		queryFn: () => UserService.getUsers(),
		staleTime: Infinity,
		retry: false,
		...options,
	});
};

export const useGetUserByEmail = (
	email: string | undefined,
	options?: UseQueryOptions<User, AxiosError, User>,
) => {
	return useQuery<User, AxiosError, User>({
		queryKey: ['user', 'email', email],
		queryFn: () => UserService.getUserByEmail(email as string),
		enabled: Boolean(email),
		staleTime: Infinity,
		retry: false,
		...options,
	});
};

export const useGetOwnRecipes = (
	options?: UseQueryOptions<Recipe[], AxiosError, Recipe[]>,
) => {
	return useQuery<Recipe[], AxiosError, Recipe[]>({
		queryKey: ['user', 'my-recipes'],
		queryFn: () => UserService.getOwnRecipes(),
		staleTime: Infinity,
		retry: false,
		...options,
	});
};

export const useGetSavedRecipes = (
	options?: UseQueryOptions<Recipe[], AxiosError, Recipe[]>,
) => {
	return useQuery<Recipe[], AxiosError, Recipe[]>({
		queryKey: ['user', 'saved-recipes'],
		queryFn: () => UserService.getSavedRecipes(),
		staleTime: Infinity,
		retry: false,
		...options,
	});
};

export const useUpdateUser = () => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, UserDTO | FormData>({
		mutationFn: (payload) => UserService.updateUser(payload),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['me'] });
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
			qc.invalidateQueries({ queryKey: ['user', 'operations'] });
		},
	});
};

export const useDeleteSavedRecipe = () => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, string>({
		mutationFn: (recipeId) => UserService.deleteSavedRecipe(recipeId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
			qc.invalidateQueries({ queryKey: ['user', 'operations'] });
		},
	});
};

export const useGetRecentOperations = (
	options?: UseQueryOptions<unknown[], AxiosError, unknown[]>,
) => {
	return useQuery<unknown[], AxiosError, unknown[]>({
		queryKey: ['user', 'operations'],
		queryFn: () => UserService.getRecentOperations(),
		staleTime: Infinity,
		retry: false,
		...options,
	});
};
