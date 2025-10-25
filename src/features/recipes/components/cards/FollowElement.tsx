import { Stack, Typography } from '@mui/material';
import AuthorFollow from '../AuthorFollow';
import { useMemo } from 'react';
import { getAuthorId, getAuthorName } from '../../utils/author.helper';
import { useToggleFollow } from '../../hooks';
import { useGetUser } from '@/features/profile/hooks/useUser';

type FollowAuthorProps = {
	rawAuthor: { _id: string; name: string };
};

const FollowAuthor = ({ rawAuthor }: FollowAuthorProps) => {
	const authorId = useMemo(() => getAuthorId(rawAuthor), [rawAuthor]);
	const authorName = useMemo(() => getAuthorName(rawAuthor), [rawAuthor]);
	const {
		isFollowing,
		loading: followLoading,
		toggle,
	} = useToggleFollow(authorId);
	const { data: me } = useGetUser();

	return (
		<Stack direction='row' alignItems='center' spacing={1}>
			<Typography variant='subtitle1' mb={2}>
				By: <strong>{authorName}</strong>{' '}
			</Typography>
			{authorId && me?._id !== authorId && (
				<AuthorFollow
					isFollowing={isFollowing ?? false}
					loading={followLoading}
					onToggle={toggle}
				/>
			)}
		</Stack>
	);
};

export default FollowAuthor;
