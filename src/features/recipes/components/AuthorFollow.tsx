import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FollowService } from '@/features/recipes/services/follow.service';

// track in-flight follow/unfollow requests per author id
const inFlightFollows = new Set<string>();

type Props = {
	authorId?: string;
	initialIsFollowing?: boolean;
	recipeId?: string | undefined;
};

export default function AuthorFollow({
	authorId,
	initialIsFollowing,
	recipeId,
}: Props) {
	const qc = useQueryClient();
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
		initialIsFollowing,
	);
	const [loading, setLoading] = useState(false);

	const isFollowingQuery = useQuery({
		queryKey: ['follow', 'isFollowing', authorId ?? ''],
		queryFn: () => FollowService.isFollowing(authorId as string),
		enabled: Boolean(authorId) && initialIsFollowing === undefined,
		staleTime: 1000 * 60, // cache for 60s
		retry: false,
	});

	useEffect(() => {
		if (initialIsFollowing !== undefined) {
			setIsFollowing(initialIsFollowing);
			return;
		}
		if (!isFollowingQuery.data) return;
		const respObj = isFollowingQuery.data as unknown as { data?: unknown };
		if (respObj && typeof respObj.data === 'object') {
			const data = respObj.data as Record<string, unknown>;
			if ('isFollowing' in data) setIsFollowing(Boolean(data.isFollowing));
		}
	}, [initialIsFollowing, isFollowingQuery.data]);

	const handleToggleFollow = async () => {
		if (!authorId) return;
		// simple module-level in-flight dedupe: avoid duplicate requests for same author
		if (inFlightFollows.has(authorId)) {
			if (process.env.NODE_ENV === 'development')
				console.debug(
					'[AuthorFollow] duplicate follow/unfollow skipped',
					authorId,
				);
			return;
		}
		inFlightFollows.add(authorId);
		setLoading(true);
		try {
			if (isFollowing) {
				const res: unknown = await FollowService.unfollow(authorId);
				const respObj = res as unknown as { data?: unknown };
				if (
					respObj &&
					typeof respObj === 'object' &&
					respObj.data !== undefined &&
					typeof respObj.data === 'object'
				) {
					const data = respObj.data as Record<string, unknown>;
					if ('isFollowing' in data) setIsFollowing(Boolean(data.isFollowing));
				}
			} else {
				const res: unknown = await FollowService.follow(authorId);
				const respObj = res as unknown as { data?: unknown };
				if (
					respObj &&
					typeof respObj === 'object' &&
					respObj.data !== undefined &&
					typeof respObj.data === 'object'
				) {
					const data = respObj.data as Record<string, unknown>;
					if ('isFollowing' in data) setIsFollowing(Boolean(data.isFollowing));
				}
			}
			// update recipe detail cache to reflect new author.isFollowing flag
			if (recipeId) {
				qc.setQueryData(['recipes', 'detail', recipeId], (old: unknown) => {
					if (!old || typeof old !== 'object') return old as unknown;
					const copy = { ...(old as Record<string, unknown>) } as Record<
						string,
						unknown
					>;
					if (typeof copy.userId === 'object' && copy.userId !== null) {
						copy.userId = {
							...(copy.userId as Record<string, unknown>),
							isFollowing: Boolean(isFollowing),
						};
					}
					return copy as unknown;
				});
			}
			qc.invalidateQueries({ queryKey: ['user', authorId ?? ''] });
			qc.invalidateQueries({ queryKey: ['user', 'me'] });
		} finally {
			setLoading(false);
			inFlightFollows.delete(authorId);
		}
	};

	if (!authorId) return null;

	return (
		<Button
			size='small'
			variant='outlined'
			onClick={handleToggleFollow}
			disabled={loading}>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
}
