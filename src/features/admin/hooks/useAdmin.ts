import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/features/admin/services/admin.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';
import type { User, UserDTO } from '@/types/user.types';

export const useGetUsers = (options?: UseCommonOptions<User[]>) => {
	return useQuery<User[]>({
		queryKey: ['admin', 'users'],
		queryFn: async () => {
			return AdminService.getUsers();
		},
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: false,
		...options,
	});
};

export const useGetUsersPaginated = (
	args?: { page?: number; limit?: number; sort?: number; search?: string },
	options?: UseCommonOptions<{
		items: User[];
		meta: { total: number; page: number; limit: number };
	}>,
) => {
	const { page = 1, limit = 10, sort = -1, search } = args ?? {};
	return useQuery({
		queryKey: ['admin', 'users', 'paginated', page, limit, sort, search],
		queryFn: async () => {
			return AdminService.getUsersPaginated({ page, limit, sort, search });
		},
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
		...options,
	});
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
			// Also invalidate paginated users queries so pages refresh
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
			// Also invalidate paginated users queries so pages refresh
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
			// Invalidate both non-paginated and paginated users queries so UI refreshes
			qc.invalidateQueries({ queryKey: ['admin', 'users'] });
			qc.invalidateQueries({ queryKey: ['admin', 'users', 'paginated'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export const useImportRecipes = (
	options?: UseCommonOptions<{ imported?: number }>,
) => {
	const qc = useQueryClient();
	return useMutation<{ imported?: number }, AxiosError, FormData>({
		mutationKey: ['admin', 'import-recipes'],
		mutationFn: async (file) => {
			return AdminService.importRecipes(file);
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['recipes'] });
			options?.onSuccess?.(data);
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export const useImportIngredients = (
	options?: UseCommonOptions<{ imported?: number }>,
) => {
	const qc = useQueryClient();
	return useMutation<{ imported?: number }, AxiosError, FormData>({
		mutationKey: ['admin', 'import-ingredients'],
		mutationFn: async (file) => {
			return AdminService.importIngredients(file);
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['ingredients'] });
			options?.onSuccess?.(data);
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export default {};
