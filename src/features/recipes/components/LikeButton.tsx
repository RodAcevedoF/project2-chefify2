import { Button, Typography } from '@mui/material';
import { useGetRecipeByID } from '@/features/recipes/hooks';
import {
	useLike,
	useUnlike,
	useHasLiked,
} from '@/features/recipes/hooks/useLike';

type Props = {
	recipeId: string;
	initialHasLiked?: boolean;
	initialLikesCount?: number;
};
export default function LikeButton({
	recipeId,
	initialHasLiked,
	initialLikesCount,
}: Props) {
	const likeMut = useLike(recipeId ?? '');
	const unlikeMut = useUnlike(recipeId ?? '');
	const { data: recipe } = useGetRecipeByID(recipeId ?? '');

	const isLikedQuery = useHasLiked(recipeId ?? '');
	const queryData = isLikedQuery.data as { hasLiked?: boolean } | undefined;
	// Prefer authoritative hook, then recipe detail, then initial prop
	const displayedHasLiked =
		queryData?.hasLiked ?? recipe?.hasLiked ?? initialHasLiked ?? false;
	const displayedLikesCount = recipe?.likesCount ?? initialLikesCount ?? 0;

	const handleToggle = async () => {
		if (!recipeId) return;
		const current =
			queryData?.hasLiked ?? recipe?.hasLiked ?? initialHasLiked ?? false;
		if (current) {
			await unlikeMut.mutateAsync();
		} else {
			await likeMut.mutateAsync();
		}
	};

	const isMutating =
		likeMut.status === 'pending' || unlikeMut.status === 'pending';

	return (
		<>
			<Button
				onClick={handleToggle}
				disabled={isMutating || isLikedQuery.isLoading}
				variant={displayedHasLiked ? 'contained' : 'outlined'}
				color={displayedHasLiked ? 'error' : 'primary'}
				size='small'>
				{displayedHasLiked ? '❤️' : '🤍'}
			</Button>
			<Typography variant='body2' component='span' sx={{ ml: 1 }}>
				{displayedLikesCount}
			</Typography>
		</>
	);
}
