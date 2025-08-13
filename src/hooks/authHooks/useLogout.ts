import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../services/auth.service';
import type { AxiosError } from 'axios';
import type {
  AuthError,
  LogoutResponse,
  UseAuthOptions,
} from '../../types/auth.types';

export const useLogout = (options?: UseAuthOptions) => {
  const queryClient = useQueryClient();
  return useMutation<LogoutResponse, AxiosError<AuthError>>({
    mutationKey: ['auth', 'logout'],

    mutationFn: async () => {
      const response = await AuthService.logout();
      return response?.data ?? { message: 'logout successful' };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
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
