import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/features/auth/services/auth.service';
import { clearRefreshQueue } from '@/lib/api';
import type { AxiosError } from 'axios';
import type { AuthResponse } from '@/types/auth.types';
import type { UseCommonOptions } from '@/types/common.types';

export const useLogout = (options?: UseCommonOptions<AuthResponse>) => {
	const queryClient = useQueryClient();
	return useMutation<AuthResponse, AxiosError>({
		mutationKey: ['auth', 'logout'],

		mutationFn: async () => {
			const response = await AuthService.logout();
			return response?.data ?? { message: 'logout successful' };
		},

		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
			// Clear any pending refresh queue to avoid retrying requests after logout
			clearRefreshQueue(new Error('User logged out'));
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},

		onError: (axiosError) => {
			console.error('Error during logout:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};
