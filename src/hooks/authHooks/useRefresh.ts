import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  UseAuthOptions,
  RefreshResponse,
  AuthError,
} from '../../types/auth.types';
import type { AxiosError } from 'axios';
import { AuthService } from '../../services/auth.service';

export const useRefresh = (options?: UseAuthOptions) => {
  const queryClient = useQueryClient();

  return useMutation<RefreshResponse, AxiosError<AuthError>, void>({
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
      const error: AuthError = axiosError.response?.data || {
        error: axiosError.message || 'Unknown error',
        statusCode: axiosError.response?.status || 500,
      };
      options?.onError?.(error);
    },
  });
};
