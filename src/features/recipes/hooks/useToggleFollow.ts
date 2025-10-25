import { useCallback } from 'react';
import { useFollow, useUnfollow, useIsFollowing } from './useFollow';

type UseToggleFollowReturn = {
	isFollowing: boolean;
	loading: boolean;
	toggle: () => void;
};

export const useToggleFollow = (userId?: string): UseToggleFollowReturn => {
	const isFollowingQuery = useIsFollowing(userId);
	const follow = useFollow(userId as string);
	const unfollow = useUnfollow(userId as string);

	const loading = follow.status === 'pending' || unfollow.status === 'pending';
	const isFollowing = isFollowingQuery.data?.isFollowing ?? false;

	const toggle = useCallback(() => {
		if (!userId) return;
		if (isFollowingQuery.data?.isFollowing) {
			unfollow.mutate();
		} else {
			follow.mutate();
		}
	}, [userId, isFollowingQuery.data?.isFollowing, follow, unfollow]);

	return { isFollowing, loading, toggle };
};

export default useToggleFollow;
