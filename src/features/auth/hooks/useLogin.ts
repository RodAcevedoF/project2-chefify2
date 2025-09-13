import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/features/auth/services/auth.service';
import type { AxiosError } from 'axios';
import type { AuthResponse, LoginParams } from '../../../types/auth.types';
import type { UseCommonOptions } from '@/types/common.types';

export const useLogin = (options?: UseCommonOptions<AuthResponse>) => {
	const queryClient = useQueryClient();

	return useMutation<AuthResponse, AxiosError, LoginParams>({
		mutationKey: ['auth', 'login'],

		mutationFn: async (credentials: LoginParams) => {
			const response = await AuthService.login(credentials);
			return response.data;
		},

		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
			queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},

		onError: (axiosError) => {
			console.error('Login error details:', axiosError);
			options?.onError?.(axiosError);
		},

		retry: (failureCount, error) => {
			if (error.response?.status === 401 || error.response?.status === 403) {
				return false;
			}
			return failureCount < 2;
		},

		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
};
