import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { FollowService } from '@/features/recipes/services/follow.service';
import { userKeys } from '@/features/profile/hooks/useUser';
import type { CommonResponse } from '@/types/common.types';
import type { User } from '@/types/user.types';

type ToggleFollowResponse = { followersCount: number; isFollowing: boolean };

type AuthorCache = {
	followersCount?: number;
	isFollowing?: boolean;
	[key: string]: unknown;
};

// mutation to follow an author
export const useFollow = (userId: string) => {
	const qc = useQueryClient();
	const key = ['user', 'detail', userId];

	return useMutation<
		{ success: boolean; data: ToggleFollowResponse },
		Error,
		void,
		{ previous?: AuthorCache }
	>({
		mutationFn: async () => {
			const resp = await FollowService.follow(userId);
			return resp as { success: boolean; data: ToggleFollowResponse };
		},
		onMutate: async () => {
			await qc.cancelQueries({ queryKey: key });
			const previous = qc.getQueryData<AuthorCache>(key);
			qc.setQueryData<AuthorCache>(key, (old) => {
				if (!old) return old;
				return {
					...old,
					followersCount: (old.followersCount ?? 0) + 1,
					isFollowing: true,
				};
			});
			return { previous };
		},
		onError: (_err, _vars, context) => {
			if (context?.previous) qc.setQueryData(key, context.previous);
		},
		onSuccess: (resp) => {
			const data = resp.data as ToggleFollowResponse;
			qc.setQueryData<AuthorCache>(key, (old) => ({
				...(old ?? {}),
				followersCount: data.followersCount,
				isFollowing: data.isFollowing,
			}));
			qc.setQueryData(['follow', 'isFollowing', userId ?? ''], {
				isFollowing: data.isFollowing,
			});
		},
		onSettled: () => {
			qc.invalidateQueries({ queryKey: userKeys.all });
			qc.invalidateQueries({ queryKey: ['user', 'me'] });
		},
	});
};

// mutation to unfollow an author
export const useUnfollow = (userId: string) => {
	const qc = useQueryClient();
	const key = ['user', 'detail', userId];

	return useMutation<
		{ success: boolean; data: ToggleFollowResponse },
		Error,
		void,
		{ previous?: AuthorCache }
	>({
		mutationFn: async () => {
			const resp = await FollowService.unfollow(userId);
			return resp as { success: boolean; data: ToggleFollowResponse };
		},
		onMutate: async () => {
			await qc.cancelQueries({ queryKey: key });
			const previous = qc.getQueryData<AuthorCache>(key);
			qc.setQueryData<AuthorCache>(key, (old) => {
				if (!old) return old;
				return {
					...old,
					followersCount: Math.max(0, (old.followersCount ?? 1) - 1),
					isFollowing: false,
				};
			});
			return { previous };
		},
		onError: (_err, _vars, context) => {
			if (context?.previous) qc.setQueryData(key, context.previous);
		},
		onSuccess: (resp) => {
			const data = resp.data as ToggleFollowResponse;
			qc.setQueryData<AuthorCache>(key, (old) => ({
				...(old ?? {}),
				followersCount: data.followersCount,
				isFollowing: data.isFollowing,
			}));
			qc.setQueryData(['follow', 'isFollowing', userId ?? ''], {
				isFollowing: data.isFollowing,
			});
		},
		onSettled: () => {
			qc.invalidateQueries({ queryKey: userKeys.all });
			qc.invalidateQueries({ queryKey: ['user', 'me'] });
		},
	});
};

// Hook to read authoritative per-user 'isFollowing' for an author
export const useIsFollowing = (userId?: string) => {
	return useQuery<{ isFollowing?: boolean }, Error>({
		queryKey: ['follow', 'isFollowing', userId ?? ''],
		queryFn: async () => {
			const resp = await FollowService.isFollowing(userId as string);
			return (resp.data ?? {}) as { isFollowing?: boolean };
		},
		enabled: Boolean(userId),
		staleTime: 1000 * 30,
		retry: false,
	});
};

// Hook to get followers list for an user
export const useFollowers = (userId?: string) => {
	return useQuery<CommonResponse<User[]>, Error>({
		queryKey: ['follow', 'followers', userId ?? ''],
		queryFn: async () => {
			const resp = await FollowService.getFollowers(userId as string);
			return resp as CommonResponse<User[]>;
		},
		enabled: Boolean(userId),
		retry: false,
	});
};

// Hook to get following list for an user
export const useFollowing = (userId?: string) => {
	return useQuery<CommonResponse<User[]>, Error>({
		queryKey: ['follow', 'following', userId ?? ''],
		queryFn: async () => {
			const resp = await FollowService.getFollowing(userId as string);
			return resp as CommonResponse<User[]>;
		},
		enabled: Boolean(userId),
		retry: false,
	});
};

export default null as unknown as never;
