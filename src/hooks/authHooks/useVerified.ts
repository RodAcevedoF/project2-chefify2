import { useQuery } from '@tanstack/react-query';
import { AuthService } from '../../services/auth.service';
import type { AxiosError } from 'axios';
import type { AuthError, VerifiedResponse } from '../../types/auth.types';

export const useVerified = () => {
  return useQuery<VerifiedResponse, AxiosError<AuthError>>({
    queryKey: ['auth', 'me'],

    queryFn: async () => {
      const response = await AuthService.getMe();
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
