import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LikeService } from '@/features/recipes/services/like.service';

import type { CommonResponse } from '@/types/common.types';

import type { AxiosError } from 'axios';

export const useLike = (recipeId: string) => {
	const queryClient = useQueryClient();
	return useMutation<void, unknown, void>({
		mutationFn: async () => LikeService.like(recipeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['likes', 'like'] });
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'detail'],
			});
		},
	});
};

export const useUnlike = (recipeId: string) => {
	const queryClient = useQueryClient();
	return useMutation<void, unknown, void>({
		mutationFn: async () => LikeService.unlike(recipeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['likes', 'like', 'unlike'] });
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'detail'],
			});
		},
	});
};

export const useHasLike = (recipeId: string) => {
	return useQuery<CommonResponse<boolean>, AxiosError, boolean>({
		queryKey: ['likes', 'like', 'unlike'],
		queryFn: () => LikeService.hasLiked(recipeId),
		staleTime: Infinity,
		select: (resp) => resp.data,
		retry: false,
	});
};
