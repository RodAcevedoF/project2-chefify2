import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/features/admin/services/admin.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';
import type { User, UserDTO } from '@/types/user.types';
import type { Recipe } from '@/types/recipe.types';
import { RecipeService } from '@/features/recipes/services/recipe.service';
import type {
	LocalQueryOptions,
	QueryData,
	UsersQueryData,
	UsersQueryOptions,
} from '@/types/admin.types';

export const useGetUsers = (options?: UseCommonOptions<User[]>) => {
	const opts = {
		queryKey: ['admin', 'users'] as const,
		queryFn: async () => AdminService.getUsers(),
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: false,
		onSuccess: options?.onSuccess,
		onError: options?.onError as unknown as (err: Error) => void,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as unknown as any;

	return useQuery<User[], Error>(opts);
};

export const useGetUsersPaginated = (
	args?: { page?: number; limit?: number; sort?: number; search?: string },
	options?: UseCommonOptions<{
		items: User[];
		meta: { total: number; page: number; limit: number };
	}>,
) => {
	const { page = 1, limit = 10, sort = -1, search } = args ?? {};

	const paginatedOpts: UsersQueryOptions = {
		queryKey: [
			'admin',
			'users',
			'paginated',
			page,
			limit,
			sort,
			search,
		] as const,
		queryFn: async () =>
			AdminService.getUsersPaginated({ page, limit, sort, search }),
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
		onSuccess: options?.onSuccess,
		onError: options?.onError as unknown as (err: Error) => void,
	};

	return useQuery<UsersQueryData, Error>(paginatedOpts);
};

export const useCreateUser = (options?: UseCommonOptions<User>) => {
	const qc = useQueryClient();
	return useMutation<User, AxiosError, FormData | Partial<UserDTO>>({
		mutationKey: ['admin', 'create-user'],
		mutationFn: async (payload) => {
			return AdminService.createUser(payload as FormData | Partial<UserDTO>);
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['admin', 'users'] });
			qc.invalidateQueries({ queryKey: ['admin', 'users', 'paginated'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export const useUpdateUser = (options?: UseCommonOptions<User>) => {
	const qc = useQueryClient();
	return useMutation<
		User,
		AxiosError,
		{ id: string; payload: FormData | Partial<UserDTO> }
	>({
		mutationKey: ['admin', 'update-user'],
		mutationFn: async ({ id, payload }) => {
			return AdminService.updateUser(
				id,
				payload as FormData | Partial<UserDTO>,
			);
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['admin', 'users'] });
			qc.invalidateQueries({ queryKey: ['admin', 'users', 'paginated'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export const useDeleteUser = (
	options?: UseCommonOptions<{ message?: string }>,
) => {
	const qc = useQueryClient();
	return useMutation<{ message?: string }, AxiosError, string>({
		mutationKey: ['admin', 'delete-user'],
		mutationFn: async (id) => {
			return AdminService.deleteUser(id);
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['admin', 'users'] });
			qc.invalidateQueries({ queryKey: ['admin', 'users', 'paginated'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export const useGetRecipesPaginated = (
	args?: { page?: number; limit?: number; sort?: number; search?: string },
	options?: UseCommonOptions<{
		items: Recipe[];
		meta: { total: number; page: number; limit: number };
	}>,
) => {
	const { page = 1, limit = 10, sort = -1, search } = args ?? {};
	const queryKey = [
		'admin',
		'recipes',
		'paginated',
		page,
		limit,
		sort,
		search,
	] as const;

	const opts: LocalQueryOptions = {
		queryKey: queryKey as readonly unknown[],
		queryFn: async () => {
			const params = { page, limit, sort, search };
			return AdminService.getRecipesPaginated(params);
		},
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
		onSuccess: options?.onSuccess,
		onError: options?.onError as unknown as (err: Error) => void,
	};

	return useQuery<QueryData, Error>(opts);
};

export const useDeleteRecipeAdmin = (options?: UseCommonOptions<void>) => {
	const qc = useQueryClient();
	return useMutation<void, AxiosError, { id: string }>({
		mutationKey: ['admin', 'delete-recipe'],
		mutationFn: async ({ id }) => {
			return RecipeService.deleteRecipe(id);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['recipes'] });
			qc.invalidateQueries({ queryKey: ['admin', 'recipes', 'paginated'] });
			options?.onSuccess?.();
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};
export default {};
