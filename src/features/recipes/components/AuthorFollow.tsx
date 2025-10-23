import { Button } from '@mui/material';
import { memo, useRef } from 'react';

type Props = {
	isFollowing: boolean;
	loading?: boolean;
	onToggle: () => void;
};

function AuthorFollow({ isFollowing, loading, onToggle }: Props) {
	const renderCount = useRef(0);
	renderCount.current += 1;

	return (
		<Button
			size='small'
			variant='outlined'
			onClick={onToggle}
			disabled={loading}>
			{isFollowing ? 'Unfollow' : 'Follow'}
			<span style={{ marginLeft: 8, color: 'gray', fontSize: 12 }}>
				({renderCount.current})
			</span>
		</Button>
	);
}

export default memo(AuthorFollow);
