import { Box } from '@mui/material';
import RecentActivityCard from './components/cards/RecentActivityCard';
import ProfileCard from './components/cards/ProfileCard';
import ProfileRecipesCard from './components/cards/ProfileRecipesCard';
import Statistics from './components/cards/Statistics';

export const ProfileLayout = () => {
	return (
		<Box sx={{ width: '100%', p: { xs: 2, md: 4 } }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', md: '240px 1fr 240px' },
					gap: 3,
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
		</Box>
	);
};

export default ProfileLayout;
