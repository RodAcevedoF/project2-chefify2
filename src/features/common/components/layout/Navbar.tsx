import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { useLogout } from '@/features/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { memo } from 'react';
import {
	AppBar,
	Toolbar,
	Box,
	CircularProgress,
	CardMedia,
	Typography,
} from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { DoorOpen, KeyRound } from 'lucide-react';

export const Navbar = memo(() => {
	const { logged, setLogged, isLoading } = useLoggedContext();
	const nav = useNavigate();
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

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	return (
		<AppBar position='static' component='nav' sx={{ width: '100%', pr: 4 }}>
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
					<CardMedia
						component='img'
						image='/logo.png'
						alt='Chefify Logo'
						sx={{ width: { md: '80px', xs: '60px' }, height: 'auto' }}
					/>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{
							display: { xs: 'none', sm: 'block' },
							fontWeight: 'bolder',
							color: 'black',
							fontFamily: 'Alegreya',
						}}>
						CHEFIFY
					</Typography>
				</Box>
				{isLoading && <CircularProgress color='inherit' />}

				{/* Botones alineados a la derecha */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 2,
						width: '100%',
					}}>
					{logged && !isLoading ? (
						<>
							<ButtonUsage
								label={logoutMutation.isPending ? 'Logging out...' : 'Logout'}
								parentMethod={handleLogout}
								disabled={logoutMutation.isPending}
								icon={DoorOpen}
							/>
						</>
					) : (
						<ButtonUsage
							label='Sign In'
							parentMethod={() => openModal('auth')}
							icon={KeyRound}
						/>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
});
