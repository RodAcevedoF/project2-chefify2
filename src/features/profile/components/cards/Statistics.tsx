import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { useLogout } from '@/features/auth/hooks';
import { Paper, Typography, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
	useGetOwnRecipes,
	useGetSavedRecipes,
	useGetUser,
} from '../../hooks/useUser';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { Donut, DoorOpen } from 'lucide-react';
import { ButtonVariants } from '@/types/common.types';
import { useModalContext } from '@/contexts/modalContext/modal.context';

const Statistics = () => {
	const { setLogged } = useLoggedContext();
	const { openModal } = useModalContext();
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
	const stats = [
		{ label: 'Recipes', value: ownRecipes?.length ?? 0 },
		{ label: 'Favorites', value: savedRecipes?.length ?? 0 },
		{ label: 'Followers', value: me?.followersCount ?? 0 },
	];
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
			{(() => {
				return stats.map((s) => (
					<Box
						key={s.label}
						sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
						<Donut color={theme.palette.primary.main} />
						<Typography variant='body1'>
							{s.label}: {s.value}
						</Typography>
					</Box>
				));
			})()}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				<ButtonUsage
					label='Settings'
					parentMethod={() => openModal('settings')}
				/>
				<ButtonUsage
					label={logoutMutation.isPending ? 'Logging out...' : 'Logout'}
					parentMethod={handleLogout}
					disabled={logoutMutation.isPending}
					variant={ButtonVariants.CANCEL}
					icon={DoorOpen}
				/>
			</Box>
		</Paper>
	);
};

export default Statistics;
