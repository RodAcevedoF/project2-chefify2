import { Box, Typography, Button, Divider } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import type { User } from '@/types/user.types';

const ViewUserModal = () => {
	const { closeModal, modalParams } = useModalContext();
	const params = modalParams as { user?: User } | undefined;
	const u = params?.user;

	if (!u) {
		return (
			<Box sx={{ p: 2, minWidth: 320 }}>
				<Typography variant='h6'>User not found</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
					<Button onClick={() => closeModal()}>Close</Button>
				</Box>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 2, minWidth: 360 }}>
			<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
				<UserAvatar name={u.name} imgUrl={u.imgUrl} size={64} />
				<Box>
					<Typography variant='h6'>{u.name}</Typography>
					<Typography variant='body2' color='text.secondary'>
						{u.email}
					</Typography>
				</Box>
			</Box>
			<Divider sx={{ my: 1 }} />
			<Box sx={{ display: 'grid', gap: 1 }}>
				<Typography variant='body2'>
					<strong>Role:</strong> {u.role}
				</Typography>
				<Typography variant='body2'>
					<strong>Recipes:</strong>{' '}
					{(u as unknown as { recipesCount?: number }).recipesCount ?? 0}
				</Typography>
				<Typography variant='body2'>
					<strong>Followers:</strong> {u.followersCount ?? 0}
				</Typography>
				<Typography variant='body2'>
					<strong>Following:</strong> {u.followingCount ?? 0}
				</Typography>
				<Typography variant='body2'>
					<strong>IA usage:</strong> {u.iaUsage?.count ?? 0}
				</Typography>
				<Typography variant='body2'>
					<strong>Verified:</strong> {u.isVerified ? 'Yes' : 'No'}
				</Typography>
				<Typography variant='body2'>
					<strong>Bio:</strong> {u.shortBio ?? '-'}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
				<Button variant='outlined' color='inherit' onClick={() => closeModal()}>
					Close
				</Button>
			</Box>
		</Box>
	);
};

export default ViewUserModal;
