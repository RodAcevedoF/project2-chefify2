import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import UserAvatar from '@/features/profile/components/avatar/UserAvatar';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useGetUser } from '../../hooks/useUser';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import { handleNavigate } from '@/utils/handleNavigate';

const ProfileCard: React.FC = () => {
	const { openModal } = useModalContext();
	const { data: me } = useGetUser();
	const theme = useTheme();
	const nav = handleNavigate('/recipes', useNavigate());

	return (
		<Paper sx={{ p: 3, textAlign: 'center' }} elevation={10}>
			<UserAvatar
				name={me?.name ?? ''}
				imgUrl={me?.imgUrl ?? undefined}
				size={80}
			/>
			<Typography
				variant='h4'
				fontWeight={700}
				gutterBottom
				sx={{ mt: 3, fontFamily: 'Alegreya' }}>
				{me?.name ?? 'User Name'}
			</Typography>
			<Typography
				color='text.secondary'
				sx={{ fontSize: '18px', mb: 2, color: theme.palette.primary.main }}>
				{`About: ${
					me?.shortBio || 'write a brief introduction or description here.'
				}`}
			</Typography>
			<Box sx={{ display: 'flex', gap: 1 }}>
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
