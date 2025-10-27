import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { FollowService } from '@/features/recipes/services/follow.service';
import type { CommonResponse } from '@/types/common.types';
import type { User } from '@/types/user.types';

type ToggleFollowResponse = { followersCount: number; isFollowing: boolean };

export const useFollow = (userId: string) => {
	const qc = useQueryClient();

	return useMutation<
		{ success: boolean; data: ToggleFollowResponse },
		Error,
		void
	>({
		mutationFn: async () => {
			const resp = await FollowService.follow(userId);
			return resp as { success: boolean; data: ToggleFollowResponse };
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: ['follow', 'isFollowing'],
			});
			// refresh recent activity
			qc.invalidateQueries({ queryKey: ['user', 'operations'] });
		},
	});
};

export const useUnfollow = (userId: string) => {
	const qc = useQueryClient();

	return useMutation<
		{ success: boolean; data: ToggleFollowResponse },
		Error,
		void
	>({
		mutationFn: async () => {
			const resp = await FollowService.unfollow(userId);
			return resp as { success: boolean; data: ToggleFollowResponse };
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: ['follow', 'isFollowing'],
			});
			// refresh recent activity
			qc.invalidateQueries({ queryKey: ['user', 'operations'] });
		},
	});
};

export const useIsFollowing = (userId?: string) => {
	return useQuery<{ isFollowing?: boolean }, Error>({
		queryKey: ['follow', 'isFollowing'],
		queryFn: async () => {
			const resp = await FollowService.isFollowing(userId as string);
			return (resp.data ?? {}) as { isFollowing?: boolean };
		},
		enabled: Boolean(userId),
		staleTime: 1000 * 30,
		retry: false,
	});
};

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
