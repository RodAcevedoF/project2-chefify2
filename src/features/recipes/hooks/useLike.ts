import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LikeService } from '@/features/recipes/services/like.service';

// Note: match the base keys used by recipes hooks
const recipesKeys = ['recipes', 'all', 'recipe'];

import type { CommonResponse } from '@/types/common.types';

import type { AxiosError } from 'axios';

export const useLike = (recipeId: string) => {
	const queryClient = useQueryClient();
	return useMutation<void, unknown, void>({
		mutationFn: async () => LikeService.like(recipeId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['likes', 'hasLiked', recipeId],
			});
			queryClient.invalidateQueries({ queryKey: [...recipesKeys, recipeId] });
			queryClient.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
			// refresh recent activity
			queryClient.invalidateQueries({ queryKey: ['user', 'operations'] });
		},
	});
};

export const useUnlike = (recipeId: string) => {
	const queryClient = useQueryClient();
	return useMutation<void, unknown, void>({
		mutationFn: async () => LikeService.unlike(recipeId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['likes', 'hasLiked', recipeId],
			});
			queryClient.invalidateQueries({ queryKey: [...recipesKeys, recipeId] });
			queryClient.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
			// refresh recent activity
			queryClient.invalidateQueries({ queryKey: ['user', 'operations'] });
		},
	});
};

export const useHasLike = (recipeId: string) => {
	return useQuery<CommonResponse<boolean>, AxiosError, boolean>({
		queryKey: ['likes', 'hasLiked', recipeId],
		queryFn: () => LikeService.hasLiked(recipeId),
		staleTime: Infinity,
		select: (resp) => resp.data,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};
