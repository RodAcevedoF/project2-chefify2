import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { FollowService } from '@/features/recipes/services/follow.service';
import type { ToggleFollowResponse } from '@/features/recipes/services/follow.service';
import type { User } from '@/types/user.types';

export const useFollow = (userId: string) => {
	const qc = useQueryClient();

	return useMutation<ToggleFollowResponse, Error, void, { previous?: boolean }>(
		{
			mutationFn: async () => {
				return FollowService.follow(userId);
			},
			onMutate: async () => {
				const key = ['follow', 'isFollowing', userId] as const;
				const previous = qc.getQueryData<boolean>(key);
				qc.setQueryData<boolean>(key, true);
				return { previous };
			},
			onError: (_err, _vars, context) => {
				console.error('Follow failed', _err);
				// rollback
				const key = ['follow', 'isFollowing', userId] as const;
				qc.setQueryData<boolean>(key, context?.previous ?? false);
			},
			onSettled: () => {
				qc.invalidateQueries({ queryKey: ['follow', 'isFollowing', userId] });
				qc.invalidateQueries({ queryKey: ['user', 'operations'] });
			},
		},
	);
};

export const useUnfollow = (userId: string) => {
	const qc = useQueryClient();

	return useMutation<ToggleFollowResponse, Error, void, { previous?: boolean }>(
		{
			mutationFn: async () => {
				return FollowService.unfollow(userId);
			},
			onMutate: async () => {
				const key = ['follow', 'isFollowing', userId] as const;
				const previous = qc.getQueryData<boolean>(key);
				qc.setQueryData<boolean>(key, false);
				return { previous };
			},
			onError: (_err, _vars, context) => {
				console.error('Unfollow failed', _err);
				const key = ['follow', 'isFollowing', userId] as const;
				qc.setQueryData<boolean>(key, context?.previous ?? false);
			},
			onSettled: () => {
				qc.invalidateQueries({ queryKey: ['follow', 'isFollowing', userId] });
				qc.invalidateQueries({ queryKey: ['user', 'operations'] });
			},
		},
	);
};

export const useIsFollowing = (userId?: string) => {
	return useQuery<boolean, Error>({
		queryKey: ['follow', 'isFollowing', userId ?? ''],
		queryFn: async () => {
			return FollowService.isFollowing(userId as string);
		},
		enabled: Boolean(userId),
		staleTime: 1000 * 30,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};

export const useFollowers = (userId?: string) => {
	return useQuery<User[], Error>({
		queryKey: ['follow', 'followers', userId ?? ''],
		queryFn: async () => {
			return FollowService.getFollowers(userId as string);
		},
		enabled: Boolean(userId),
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};

export const useFollowing = (userId?: string) => {
	return useQuery<User[], Error>({
		queryKey: ['follow', 'following', userId ?? ''],
		queryFn: async () => {
			return FollowService.getFollowing(userId as string);
		},
		enabled: Boolean(userId),
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
	});
};
