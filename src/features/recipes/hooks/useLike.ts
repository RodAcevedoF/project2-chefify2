import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LikeService } from '@/features/recipes/services/like.service';

const recipesKeys = ['recipes', 'all', 'recipe'];

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
	return useQuery<boolean, AxiosError, boolean>({
		queryKey: ['likes', 'hasLiked', recipeId],
		queryFn: () => LikeService.hasLiked(recipeId),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};
