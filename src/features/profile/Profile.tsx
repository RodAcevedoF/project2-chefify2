import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import RecentActivityCard from './components/cards/RecentActivityCard';
import ProfileCard from './components/cards/ProfileCard';
import { useNavigate } from 'react-router-dom';
//import { ButtonUsage } from '../common/components/ui/buttons/MainButton';
import ProfileRecipesCard from './components/cards/ProfileRecipesCard';
import {
	useGetUser,
	useGetOwnRecipes,
	useGetSavedRecipes,
} from './hooks/useUser';

export const ProfileLayout = () => {
	const nav = useNavigate();

	const handleNavigate = (path: string) => {
		return () => nav(path);
	};

	const theme = useTheme();

	const { data: me } = useGetUser();
	console.log('me', me);
	const { data: ownRecipes } = useGetOwnRecipes();
	const { data: savedRecipes } = useGetSavedRecipes();

	return (
		<Box sx={{ width: '100%', p: { xs: 2, md: 4 } }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', md: '240px 1fr 240px' },
					gap: 3,
				}}>
				{/* Left: Profile Card */}
				<Box>
					<ProfileCard />
				</Box>

				{/* Center: Activity / Recipes */}
				<Box>
					<ProfileRecipesCard />

					{/* Recent activity */}
					<Box sx={{ mb: 2 }}>
						<RecentActivityCard />
					</Box>
				</Box>
				<Box>
					<Paper sx={{ p: 2 }} elevation={2}>
						<Typography
							variant='h6'
							sx={{
								fontFamily: 'Alegreya',
								border: 1,
								borderColor: theme.palette.background.default,
								p: 1,
								borderRadius: 3,
								mb: 2,
							}}>
							Statistics
						</Typography>
						<Typography variant='body2'>
							Recipes: {ownRecipes?.length ?? 0}
						</Typography>
						<Typography variant='body2'>
							Favorites: {savedRecipes?.length ?? 0}
						</Typography>
						<Typography variant='body2' sx={{ mb: 2 }}>
							Followers: {me?.followersCount ?? 0}
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Button
								variant='outlined'
								onClick={handleNavigate('/profile/settings')}>
								Settings
							</Button>
							<Button
								variant='outlined'
								color='error'
								onClick={handleNavigate('/logout')}>
								Log out
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default ProfileLayout;
