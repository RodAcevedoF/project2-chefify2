import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/features/admin/services/admin.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';
import type {
	ImportRecipesResult,
	ImportUsersResult,
} from '@/features/admin/services/admin.service';
import { useCallback } from 'react';

type UploadFn<T> = (file: File) => Promise<T>;

export const useImportRecipes = (
	options?: UseCommonOptions<ImportRecipesResult>,
) => {
	const qc = useQueryClient();
	return useMutation<ImportRecipesResult, AxiosError, FormData>({
		mutationKey: ['admin', 'import-recipes'],
		mutationFn: async (file) => AdminService.importRecipes(file),
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
		mutationFn: async (file) => AdminService.importIngredients(file),
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['ingredients'] });
			options?.onSuccess?.(data);
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

export const useImportUsers = (
	options?: UseCommonOptions<ImportUsersResult>,
) => {
	const qc = useQueryClient();
	return useMutation<ImportUsersResult, AxiosError, FormData>({
		mutationKey: ['admin', 'import-users'],
		mutationFn: async (file) => AdminService.importUsers(file),
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['admin', 'users'] });
			qc.invalidateQueries({ queryKey: ['admin', 'users', 'paginated'] });
			options?.onSuccess?.(data);
		},
		onError: (err) => options?.onError?.(err as unknown as Error),
	});
};

// wrappers
export const useUploadRecipes = () => {
	const mutation = useImportRecipes();

	const upload: UploadFn<ImportRecipesResult> = useCallback(
		async (file: File) => {
			const fd = new FormData();
			fd.append('file', file);
			return mutation.mutateAsync(fd);
		},
		[mutation],
	);

	return {
		upload,
		isPending:
			(mutation as unknown as { isPending?: boolean }).isPending ?? false,
		isLoading:
			(mutation as unknown as { isPending?: boolean }).isPending ?? false,
		data: mutation.data as ImportRecipesResult | undefined,
		error: mutation.error as AxiosError<{ message?: string }> | null,
	};
};

export const useUploadUsers = () => {
	const mutation = useImportUsers();

	const upload: UploadFn<ImportUsersResult> = useCallback(
		async (file: File) => {
			const fd = new FormData();
			fd.append('file', file);
			return mutation.mutateAsync(fd);
		},
		[mutation],
	);

	return {
		upload,
		isPending:
			(mutation as unknown as { isPending?: boolean }).isPending ?? false,
		isLoading:
			(mutation as unknown as { isPending?: boolean }).isPending ?? false,
		data: mutation.data as ImportUsersResult | undefined,
		error: mutation.error as AxiosError<{ message?: string }> | null,
	};
};

export const useUploadIngredients = () => {
	const mutation = useImportIngredients();

	const upload: UploadFn<{ imported?: number }> = useCallback(
		async (file: File) => {
			const fd = new FormData();
			fd.append('file', file);
			return mutation.mutateAsync(fd);
		},
		[mutation],
	);

	return {
		upload,
		isPending:
			(mutation as unknown as { isPending?: boolean }).isPending ?? false,
		isLoading:
			(mutation as unknown as { isPending?: boolean }).isPending ?? false,
		data: mutation.data as { imported?: number } | undefined,
		error: mutation.error as AxiosError<{ message?: string }> | null,
	};
};

export default {};
