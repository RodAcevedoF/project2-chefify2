import { Box } from '@mui/material';
import RecentActivityCard from './components/cards/RecentActivityCard';
import ProfileCard from './components/cards/ProfileCard';
import ProfileRecipesCard from './components/cards/ProfileRecipesCard';
import Statistics from './components/cards/Statistics';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import { ButtonUsage } from '../common/components/buttons/MainButton';
import { HomeIcon } from 'lucide-react';
import { ButtonIconPositions } from '@/types/common.types';

export const ProfileLayout = () => {
	const nav = useHandleNavigate('/home');
	return (
		<Box sx={{ width: '100%', p: { xs: 2, md: 4 } }}>
			<Box
				sx={{
					display: { xs: 'flex', md: 'grid' },
					gridTemplateColumns: { xs: '1fr', md: '250px 1fr 240px' },
					gap: 3,
					width: '100%',
					flexDirection: 'column',
				}}>
				<Box>
					<ProfileCard />
				</Box>

				<Box>
					<ProfileRecipesCard />
					<Box sx={{ mb: 2 }}>
						<RecentActivityCard />
					</Box>
				</Box>
				<Box>
					<Statistics />
				</Box>
			</Box>
			<ButtonUsage
				label='Back'
				icon={HomeIcon}
				parentMethod={nav}
				extraSx={{ mt: 5 }}
				iconPos={ButtonIconPositions.START}
			/>
		</Box>
	);
};

export default ProfileLayout;
