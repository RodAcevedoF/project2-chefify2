import { Box, Typography, Button, Divider, useTheme } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import type { User } from '@/types/user.types';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

const ViewUserModal = () => {
	const { closeModal, modalParams } = useModalContext();
	const params = modalParams as { user?: User } | undefined;
	const u = params?.user;
	const t = useTheme();

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
		<Box
			sx={{
				p: 2,
				minWidth: 360,
				background: t.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',

					gap: 2,
				}}>
				<UserAvatar
					name={u.name}
					imgUrl={u.imgUrl}
					size={84}
					sx={{ border: 1, mb: 0 }}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}>
					<Typography variant='h6' fontFamily={'Alegreya'}>
						{u.name}
					</Typography>
					<Typography
						variant='body2'
						fontWeight={'bolder'}
						color='text.secondary'>
						{u.email}
					</Typography>
				</Box>
			</Box>
			<Divider
				sx={{ my: 2, py: '1px', bgcolor: 'background.semitransparent' }}
			/>
			<Box sx={{ display: 'grid', gap: 1 }}>
				<Typography variant='body1'>
					<strong>Role:</strong> {u.role}
				</Typography>
				<Typography variant='body1'>
					<strong>Recipes:</strong>{' '}
					{(u as unknown as { recipesCount?: number }).recipesCount ?? 0}
				</Typography>
				<Typography variant='body1'>
					<strong>Followers:</strong> {u.followersCount ?? 0}
				</Typography>
				<Typography variant='body1'>
					<strong>Following:</strong> {u.followingCount ?? 0}
				</Typography>
				<Typography variant='body1'>
					<strong>IA usage:</strong> {u.iaUsage?.count ?? 0}
				</Typography>
				<Typography variant='body1'>
					<strong>Verified:</strong> {u.isVerified ? 'Yes' : 'No'}
				</Typography>
				<Typography variant='body1'>
					<strong>Bio:</strong> {u.shortBio ?? '-'}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
				<ButtonUsage
					label='Close'
					parentMethod={closeModal}
					variant={ButtonVariants.DEFAULT}
				/>
			</Box>
		</Box>
	);
};

export default ViewUserModal;
