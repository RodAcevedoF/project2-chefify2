import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { LikeService } from '@/features/recipes/services/like.service';
import { recipesKeys } from './useRecipes';

type ToggleLikeResponse = { likesCount: number; hasLiked: boolean };

type RecipeCache = {
	likesCount?: number;
	hasLiked?: boolean;
	[key: string]: unknown;
};

export const useLike = (recipeId: string) => {
	const qc = useQueryClient();
	const key = recipesKeys.detail(recipeId);

	return useMutation<
		{ success: boolean; data: ToggleLikeResponse },
		Error,
		void,
		{ previous?: RecipeCache }
	>({
		mutationFn: async () => {
			const resp = await LikeService.like(recipeId);
			return resp as { success: boolean; data: ToggleLikeResponse };
		},
		onMutate: async () => {
			await qc.cancelQueries({ queryKey: key });
			const previous = qc.getQueryData<RecipeCache>(key);
			qc.setQueryData<RecipeCache>(key, (old) => {
				if (!old) return old;
				return {
					...old,
					likesCount: (old.likesCount ?? 0) + 1,
					hasLiked: true,
				};
			});
			return { previous };
		},
		onError: (
			_err: Error,
			_vars: void,
			context?: { previous?: RecipeCache },
		) => {
			if (context?.previous) qc.setQueryData(key, context.previous);
			console.error('useLike - mutation error', _err);
		},
		onSuccess: (resp) => {
			const data = resp.data as ToggleLikeResponse;
			qc.setQueryData<RecipeCache>(key, (old) => ({
				...(old ?? {}),
				likesCount: data.likesCount,
				hasLiked: data.hasLiked,
			}));
			qc.setQueryData(['like', 'hasLiked', recipeId ?? ''], {
				hasLiked: data.hasLiked,
			});
			console.log('useLike - mutation success', { recipeId, data, resp });
		},
		onSettled: () => {
			qc.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
			qc.invalidateQueries({ queryKey: ['user', 'me'] });
			// ensure recipe detail is refetched from server to reflect authoritative likes
			qc.invalidateQueries({ queryKey: key });
			// also refresh recipes lists so aggregate views update
			qc.invalidateQueries({ queryKey: recipesKeys.all });
		},
	});
};

export const useUnlike = (recipeId: string) => {
	const qc = useQueryClient();
	const key = recipesKeys.detail(recipeId);

	return useMutation<
		{ success: boolean; data: ToggleLikeResponse },
		Error,
		void,
		{ previous?: RecipeCache }
	>({
		mutationFn: async () => {
			const resp = await LikeService.unlike(recipeId);
			return resp as { success: boolean; data: ToggleLikeResponse };
		},
		onMutate: async () => {
			await qc.cancelQueries({ queryKey: key });
			const previous = qc.getQueryData<RecipeCache>(key);
			qc.setQueryData<RecipeCache>(key, (old) => {
				if (!old) return old;
				return {
					...old,
					likesCount: Math.max(0, (old.likesCount ?? 1) - 1),
					hasLiked: false,
				};
			});
			return { previous };
		},
		onError: (
			_err: Error,
			_vars: void,
			context?: { previous?: RecipeCache },
		) => {
			if (context?.previous) qc.setQueryData(key, context.previous);
			console.error('useUnlike - mutation error', _err);
		},
		onSuccess: (resp) => {
			const data = resp.data as ToggleLikeResponse;
			qc.setQueryData<RecipeCache>(key, (old) => ({
				...(old ?? {}),
				likesCount: data.likesCount,
				hasLiked: data.hasLiked,
			}));
			qc.setQueryData(['like', 'hasLiked', recipeId ?? ''], {
				hasLiked: data.hasLiked,
			});
			console.log('useUnlike - mutation success', { recipeId, data, resp });
		},
		onSettled: () => {
			qc.invalidateQueries({ queryKey: ['user', 'saved-recipes'] });
			qc.invalidateQueries({ queryKey: ['user', 'me'] });
			// ensure recipe detail is refetched from server to reflect authoritative likes
			qc.invalidateQueries({ queryKey: key });
			// also refresh recipes lists so aggregate views update
			qc.invalidateQueries({ queryKey: recipesKeys.all });
		},
	});
};

export default null as unknown as never;

// Hook to read authoritative per-user 'hasLiked' for a recipe.
export const useHasLiked = (recipeId?: string) => {
	return useQuery<{ hasLiked?: boolean }, Error>({
		queryKey: ['like', 'hasLiked', recipeId ?? ''],
		queryFn: async () => {
			const resp = await LikeService.hasLiked(recipeId as string);
			return (resp.data ?? {}) as { hasLiked?: boolean };
		},
		enabled: Boolean(recipeId),
		staleTime: 1000 * 30,
		retry: false,
	});
};
