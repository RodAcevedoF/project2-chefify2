import React from 'react';
import {
	Box,
	Typography,
	Paper,
	useTheme,
	CardActionArea,
} from '@mui/material';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useGetUser } from '../../hooks/useUser';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { useHandleNavigate } from '@/utils/useHandleNavigate';

const ProfileCard: React.FC = () => {
	const { openModal } = useModalContext();
	const { data: me } = useGetUser();
	const theme = useTheme();
	const nav = useHandleNavigate('/recipes');

	return (
		<Paper
			sx={{
				p: 3,
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100',
				borderRadius: 3,
			}}
			elevation={10}>
			<CardActionArea
				onClick={() => openModal('generalImg', { imgUrl: me?.imgUrl })}
				sx={{ width: 'fit-content', height: 'fit-content', zIndex: 0 }}
				aria-label={`Open ${me?.name ?? 'profile'} modal`}>
				<UserAvatar
					name={me?.name ?? ''}
					imgUrl={me?.imgUrl ?? undefined}
					size={150}
				/>
			</CardActionArea>
			<Typography
				variant='h4'
				fontWeight={700}
				gutterBottom
				sx={{ mt: 1, fontFamily: 'Alegreya' }}>
				{me?.name ?? 'User Name'}
			</Typography>
			<Typography
				color='text.secondary'
				sx={{ fontSize: '18px', mb: 2, color: theme.palette.primary.main }}>
				{`About: ${
					me?.shortBio || 'write a brief introduction or description here.'
				}`}
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				<ButtonUsage
					label='Edit Profile'
					parentMethod={() => openModal('profileEdit')}
					extraSx={{ flex: 1, minWidth: 0 }}
				/>
				<ButtonUsage
					label='My Recipes'
					parentMethod={nav}
					extraSx={{ flex: 1, minWidth: 0 }}
				/>
			</Box>
		</Paper>
	);
};

export default ProfileCard;
