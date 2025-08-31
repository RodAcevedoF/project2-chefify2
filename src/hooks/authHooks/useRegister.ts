import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import type { AxiosError } from 'axios';
import type { RegisterParams, AuthResponse } from '@/types/auth.types';
import type { UseCommonOptions } from '@/types/common.types';

export const useRegister = (options?: UseCommonOptions<AuthResponse>) => {
	const queryClient = useQueryClient();

	return useMutation<AuthResponse, AxiosError, RegisterParams>({
		mutationKey: ['auth', 'register'],

		mutationFn: async (registerData: RegisterParams) => {
			const response = await AuthService.register(registerData);
			return response.data;
		},

		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
			queryClient.invalidateQueries({ queryKey: ['user', 'register'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},

		onError: (axiosError) => {
			console.error('Error creating recipe:', axiosError);
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
