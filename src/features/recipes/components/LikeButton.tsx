import { Button, Typography } from '@mui/material';
import { memo } from 'react';

type Props = {
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
	return (
		<>
			<Button
				onClick={onToggle}
				disabled={disabled}
				variant={displayedHasLiked ? 'contained' : 'outlined'}
				color={displayedHasLiked ? 'error' : 'primary'}
				size='small'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{displayedHasLiked ? '❤️' : '🤍'}
				<Typography
					variant='body2'
					component='span'
					sx={{ ml: 1, fontWeight: 'bold' }}>
					{displayedLikesCount}
				</Typography>
			</Button>
			<Typography
				variant='caption'
				color='text.secondary'
				sx={{ ml: 1 }}></Typography>
		</>
	);
}

export default memo(LikeButton);
