import { Button, Typography } from '@mui/material';
import { memo, useRef } from 'react';

type Props = {
	// presentational props: displayed state comes from parent
	displayedHasLiked: boolean;
	displayedLikesCount: number;
	disabled?: boolean;
	onToggle: () => void;
};

function LikeButton({
	displayedHasLiked,
	displayedLikesCount,
	disabled,
	onToggle,
}: Props) {
	const renderCount = useRef(0);
	renderCount.current += 1;

	return (
		<>
			<Button
				onClick={onToggle}
				disabled={disabled}
				variant={displayedHasLiked ? 'contained' : 'outlined'}
				color={displayedHasLiked ? 'error' : 'primary'}
				size='small'>
				{displayedHasLiked ? '❤️' : '🤍'}
			</Button>
			<Typography variant='body2' component='span' sx={{ ml: 1 }}>
				{displayedLikesCount}
			</Typography>
			<Typography variant='caption' color='text.secondary' sx={{ ml: 1 }}>
				({renderCount.current})
			</Typography>
		</>
	);
}

export default memo(LikeButton);
