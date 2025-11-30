import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { useLogout } from '@/features/auth/hooks';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	AppBar,
	Toolbar,
	Box,
	CircularProgress,
	CardMedia,
	Typography,
} from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { DoorOpen, KeyRound, ShieldUser } from 'lucide-react';

export const Navbar = memo(() => {
	const { logged, setLogged, isLoading, isAdmin } = useLoggedContext();
	const handleHome = useHandleNavigate((/* param? */) =>
		logged ? '/home' : '/');
	const handleAdmin = useHandleNavigate('/admin');
	const handleRoot = useHandleNavigate('/');
	const { openModal } = useModalContext();
	const theme = useTheme();
	const isBelow = useMediaQuery(theme.breakpoints.down('sm'));

	const logoutMutation = useLogout({
		onSuccess: () => {
			setLogged(false);
			handleRoot();
		},
		onError: (error) => {
			setLogged(false);
			console.error('Logout error:', error);
			handleRoot();
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};
	return (
		<AppBar
			position='static'
			component='nav'
			sx={{ width: '100%', pr: 4, background: 'transparent', boxShadow: 5 }}>
			<Toolbar>
				<Box
					sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}
					onClick={() => handleHome()}>
					<CardMedia
						component='img'
						image='/logo.webp'
						alt='Chefify Logo'
						sx={{
							width: { md: '80px', xs: '60px' },
							height: 'auto',
							cursor: 'pointer',
						}}
						id='main-logo'
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

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 2,
						width: '100%',
					}}>
					{logged && isAdmin && (
						<ButtonUsage
							label={isBelow ? '' : 'Admin Panel'}
							parentMethod={handleAdmin}
							icon={ShieldUser}
						/>
					)}
					{logged && !isLoading ? (
						<>
							<ButtonUsage
								label={
									isBelow
										? ''
										: logoutMutation.isPending
										? 'Logging out...'
										: 'Logout'
								}
								parentMethod={handleLogout}
								disabled={logoutMutation.isPending}
								icon={DoorOpen}
								cyData='logout-btn'
							/>
						</>
					) : (
						<ButtonUsage
							label={'Sign In'}
							parentMethod={() => openModal('auth')}
							icon={KeyRound}
							cyData='login-btn'
						/>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
});
