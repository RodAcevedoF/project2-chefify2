import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import { ChefHat, CloudUpload, House, ShieldUser } from 'lucide-react';
import { memo, Suspense } from 'react';
import useHandleNavigate from '@/utils/useHandleNavigate';
import RecentActivityChart from './components/charts/RecentActivityChart';
import UploadAnimation from './components/cards/UploadAnimation';

const AdminPage = () => {
	const useAdminNav = (arg?: string) =>
		useHandleNavigate(!arg ? '/profile' : `/admin/${arg}`);

	return (
		<>
			<Box
				sx={{
					p: 4,
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography variant='h3' sx={{ mb: 2, fontFamily: 'Alegreya' }}>
					Admin Panel (Draft)
				</Typography>
				<Divider sx={{ mb: 2 }} />

				<Typography variant='body1' sx={{ mb: 2 }}>
					This is a lightweight admin dashboard placeholder. Add sections here
					for user management, content moderation, system stats, and other admin
					tools.
				</Typography>

				<Suspense fallback={<CircularProgress />}>
					<RecentActivityChart days={14} />
				</Suspense>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						mt: 2,
						flexWrap: 'wrap',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<ButtonUsage
						label='User Management'
						parentMethod={useAdminNav('users')}
						variant={ButtonVariants.DEFAULT}
						icon={ShieldUser}
					/>
					<ButtonUsage
						label='Recipe Management'
						parentMethod={useAdminNav('recipes')}
						variant={ButtonVariants.DEFAULT}
						icon={ChefHat}
					/>
					<ButtonUsage
						label='Files Upload'
						parentMethod={useAdminNav('uploads')}
						variant={ButtonVariants.DEFAULT}
						icon={CloudUpload}
					/>
					<ButtonUsage
						parentMethod={useAdminNav()}
						variant={ButtonVariants.OUTLINED}
						icon={House}
						iconSx={{ width: '30px', height: '30px' }}
					/>
				</Box>
				<UploadAnimation />
			</Box>
		</>
	);
};

export default memo(AdminPage);
