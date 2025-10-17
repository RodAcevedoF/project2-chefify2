import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/features/auth/services/auth.service';
import { clearRefreshQueue } from '@/lib/api';
import type { AxiosError } from 'axios';
import type {
	AuthResponse,
	LoginParams,
	RegisterParams,
} from '@/types/auth.types';
import type { UseCommonOptions } from '@/types/common.types';

export const useLogin = (options?: UseCommonOptions<AuthResponse>) => {
	const qc = useQueryClient();
	return useMutation<AuthResponse, AxiosError, LoginParams>({
		mutationKey: ['auth', 'login'],
		mutationFn: async (credentials: LoginParams) => {
			const response = await AuthService.login(credentials);
			return response.data;
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['auth'] });
			qc.invalidateQueries({ queryKey: ['user', 'profile'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Login error details:', axiosError);
			options?.onError?.(axiosError);
		},
		retry: (failureCount, error: unknown) => {
			const status = (error as { response?: { status?: number } })?.response
				?.status;
			if (status === 401 || status === 403) return false;
			return failureCount < 2;
		},
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
};

export const useLogout = (options?: UseCommonOptions<AuthResponse>) => {
	const qc = useQueryClient();
	return useMutation<AuthResponse, AxiosError>({
		mutationKey: ['auth', 'logout'],
		mutationFn: async () => {
			const response = await AuthService.logout();
			return response?.data ?? { message: 'logout successful' };
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['auth', 'me'] });
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

export const useRefresh = (options?: UseCommonOptions<AuthResponse>) => {
	const qc = useQueryClient();
	return useMutation<AuthResponse, AxiosError, void>({
		mutationKey: ['auth', 'refresh'],
		mutationFn: async () => {
			const response = await AuthService.refresh();
			return response;
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['auth'] });
			qc.invalidateQueries({ queryKey: ['user', 'refresh'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Error refreshing token:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};

export const useRegister = (options?: UseCommonOptions<AuthResponse>) => {
	const qc = useQueryClient();
	return useMutation<AuthResponse, AxiosError, RegisterParams>({
		mutationKey: ['auth', 'register'],
		mutationFn: async (registerData: RegisterParams) => {
			const response = await AuthService.register(registerData);
			return response.data;
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['auth'] });
			qc.invalidateQueries({ queryKey: ['user', 'register'] });
			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Error registering user:', axiosError);
			options?.onError?.(axiosError);
		},
		retry: (failureCount, error: unknown) => {
			const status = (error as { response?: { status?: number } })?.response
				?.status;
			if (status === 401 || status === 403) return false;
			return failureCount < 2;
		},
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
};

export const useVerified = () => {
	return useQuery<AuthResponse, AxiosError>({
		queryKey: ['auth', 'me'],
		queryFn: async () => {
			const response = await AuthService.getMe();
			return response.data.data;
		},
		staleTime: 5 * 60 * 1000,
		retry: false,
	});
};
