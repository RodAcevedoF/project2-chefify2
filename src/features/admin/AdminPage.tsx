import {
	Box,
	Typography,
	Divider,
	CircularProgress,
	CardMedia,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import { ChefHat, CloudUpload, House, ShieldUser } from 'lucide-react';
import { memo, Suspense } from 'react';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import RecentActivityChart from './components/charts/RecentActivityChart';

const AdminPage = () => {
	const useAdminNav = (arg?: string) =>
		useHandleNavigate(!arg ? '/profile' : `/admin/${arg}`);
	const homeNav = useHandleNavigate('/home');

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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
					}}>
					<Typography variant='h3' sx={{ mb: 2, fontFamily: 'Alegreya' }}>
						Admin Panel
					</Typography>
					<CardMedia
						component='img'
						image='/profile/server.webp'
						alt='Admin Dashboard'
						sx={{
							width: '120px',
							height: '120px',
							mb: 2,
							maskImage: 'radial-gradient(circle, black 80%, transparent 100%)',
							webkitMaskImage:
								'radial-gradient(circle, black 80%, transparent 100%)',
							borderRadius: '50%',
						}}
					/>
				</Box>
				<Divider sx={{ mb: 2 }} />

				<Typography
					sx={{
						mb: 5,
						fontWeight: 'bolder',
						fontSize: '18px',
						color: 'background.paper',
					}}>
					This is a lightweight admin dashboard. Check the activity chart and
					sections for user management, recipe management and other admin
					features and tools.
				</Typography>

				<Suspense fallback={<CircularProgress />}>
					<RecentActivityChart days={14} />
				</Suspense>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						mt: 5,
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
						parentMethod={homeNav}
						variant={ButtonVariants.OUTLINED}
						icon={House}
						iconSx={{ width: '30px', height: '30px' }}
					/>
				</Box>
			</Box>
		</>
	);
};

export default memo(AdminPage);
