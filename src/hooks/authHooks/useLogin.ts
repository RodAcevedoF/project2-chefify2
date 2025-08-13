import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../services/auth.service';
import type { AxiosError } from 'axios';
import type {
  LoginParams,
  LoginResponse,
  AuthError,
  UseAuthOptions,
} from '../../types/auth.types';

export const useLogin = (options?: UseAuthOptions) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError<AuthError>, LoginParams>({
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
      const error: AuthError = axiosError.response?.data || {
        error: axiosError.message || 'Unknown error',
        statusCode: axiosError.response?.status || 500,
      };

      console.error('Error at login:', error);

      options?.onError?.(error);
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
