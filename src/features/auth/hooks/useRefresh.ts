import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthResponse } from '@/types/auth.types';
import type { AxiosError } from 'axios';
import { AuthService } from '@/features/auth/services/auth.service';
import type { UseCommonOptions } from '@/types/common.types';

export const useRefresh = (options?: UseCommonOptions<AuthResponse>) => {
	const queryClient = useQueryClient();

	return useMutation<AuthResponse, AxiosError, void>({
		mutationKey: ['auth', 'refresh'],

		mutationFn: async () => {
			const response = await AuthService.refresh();
			return response;
		},

		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
			queryClient.invalidateQueries({ queryKey: ['user', 'refresh'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},

		onError: (axiosError) => {
			console.error('Error refreshing token:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
