import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/features/auth/services/auth.service';
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
			return response;
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
			return response ?? { message: 'logout successful' };
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['auth', 'me'] });

			options?.onSuccess?.(data);
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Error during logout:', axiosError);
			options?.onError?.(axiosError);
		},
	});
};

// refresh flow removed - useRefresh deprecated and removed.

export const useRegister = (options?: UseCommonOptions<AuthResponse>) => {
	const qc = useQueryClient();
	return useMutation<AuthResponse, AxiosError, RegisterParams>({
		mutationKey: ['auth', 'register'],
		mutationFn: async (registerData: RegisterParams) => {
			const response = await AuthService.register(registerData);
			return response;
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

export const useChangePassword = (options?: UseCommonOptions<void>) => {
	const qc = useQueryClient();
	return useMutation<
		void,
		AxiosError,
		{ currentPassword?: string; newPassword: string; targetUserId?: string }
	>({
		mutationKey: ['auth', 'change-password'],
		mutationFn: async (payload) => {
			await AuthService.changePassword(payload);
		},
		onSuccess: () => {
			// invalidate user/me queries so UI reflects any session/state changes
			qc.invalidateQueries({ queryKey: ['me'] });
			options?.onSuccess?.();
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Error changing password:', axiosError);
			options?.onError?.(axiosError as AxiosError);
		},
	});
};

export const useForgotPassword = (options?: UseCommonOptions<void>) => {
	return useMutation<void, AxiosError, { email: string }>({
		mutationKey: ['auth', 'forgot-password'],
		mutationFn: async (payload) => {
			await AuthService.forgotPassword(payload);
		},
		onSuccess: () => {
			options?.onSuccess?.();
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Error in forgot password:', axiosError);
			options?.onError?.(axiosError as AxiosError);
		},
	});
};

export const useResetPassword = (options?: UseCommonOptions<void>) => {
	return useMutation<void, AxiosError, { token: string; newPassword: string }>({
		mutationKey: ['auth', 'reset-password'],
		mutationFn: async (payload) => {
			await AuthService.resetPassword(payload);
		},
		onSuccess: () => {
			options?.onSuccess?.();
			options?.redirectTo?.();
		},
		onError: (axiosError) => {
			console.error('Error in reset password:', axiosError);
			options?.onError?.(axiosError as AxiosError);
		},
	});
};

export const useVerified = () => {
	return useQuery<AuthResponse, AxiosError>({
		queryKey: ['auth', 'me'],
		queryFn: async () => {
			const response = await AuthService.getMe();
			return response;
		},
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};
