import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { useLogout } from '@/features/auth/hooks';
import { handleNavigate } from '@/utils/handleNavigate';
import { Button, Paper, Typography, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
	useGetOwnRecipes,
	useGetSavedRecipes,
	useGetUser,
} from '../../hooks/useUser';

const Statistics = () => {
	const { setLogged } = useLoggedContext();
	const logoutMutation = useLogout({
		onSuccess: () => {
			setLogged(false);
			nav('/');
		},
		onError: (error) => {
			setLogged(false);
			console.error('Logout error:', error);
			nav('/');
		},
	});
	const theme = useTheme();
	const nav = useNavigate();

	const handleLogout = () => {
		logoutMutation.mutate();
	};
	const { data: ownRecipes } = useGetOwnRecipes();
	const { data: savedRecipes } = useGetSavedRecipes();
	const { data: me } = useGetUser();

	return (
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
					onClick={handleNavigate('/profile/settings', nav)}>
					Settings
				</Button>
				<Button
					variant='outlined'
					color='error'
					onClick={handleLogout}
					disabled={logoutMutation.isLoading}>
					Log out
				</Button>
			</Box>
		</Paper>
	);
};

export default Statistics;
