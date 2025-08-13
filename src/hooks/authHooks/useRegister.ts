import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../services/auth.service';
import type { AxiosError } from 'axios';
import type {
  RegisterParams,
  AuthError,
  UseAuthOptions,
  RegisterResponse,
} from '../../types/auth.types';

export const useRegister = (options?: UseAuthOptions) => {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponse, AxiosError<AuthError>, RegisterParams>({
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
      const error: AuthError = axiosError.response?.data || {
        error: axiosError.message || 'Unknown error',
        statusCode: axiosError.response?.status || 500,
      };
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
