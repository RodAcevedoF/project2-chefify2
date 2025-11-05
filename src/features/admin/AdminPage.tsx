import { Box, Typography, Divider } from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import { ShieldUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const AdminPage = () => {
	const nav = useNavigate();

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant='h4' sx={{ mb: 2 }}>
				Admin Panel (Draft)
			</Typography>
			<Divider sx={{ mb: 2 }} />

			<Typography variant='body1' sx={{ mb: 2 }}>
				This is a lightweight admin dashboard placeholder. Add sections here for
				user management, content moderation, system stats, and other admin
				tools.
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
				<ButtonUsage
					label='User Management'
					parentMethod={() => nav('/admin/users')}
					variant={ButtonVariants.DEFAULT}
					icon={ShieldUser}
				/>
				<ButtonUsage
					label='Site Settings'
					parentMethod={() => nav('/admin/settings')}
					variant={ButtonVariants.OUTLINED}
				/>
			</Box>
		</Box>
	);
};

export default memo(AdminPage);
