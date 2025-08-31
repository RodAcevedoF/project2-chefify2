import { ButtonUsage } from '@/components/ui/buttons/MainButton';
import { useLogout } from '@/hooks/authHooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { memo } from 'react';
import { AppBar, Toolbar, Box, CircularProgress } from '@mui/material';

export const Navbar = memo(() => {
	const { logged, setLogged, isLoading } = useLoggedContext();
	const nav = useNavigate();

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

	const handleNavClick = (path: string) => {
		if (isLoading || !path) return;
		return () => nav(path);
	};

	return (
		<AppBar
			position='static'
			component='nav'
			sx={{
				background:
					'linear-gradient(217deg,rgba(0, 0, 0, 1) 80%, rgba(1, 43, 21, 1) 92%, rgba(87, 179, 118, 1) 100%)',
				p: 1,
				borderBottom: 2,
				borderColor: '#38825260',
				boxShadow: '10px 5px 50px #38825260',
			}}>
			<Toolbar>
				{isLoading && <CircularProgress color='primary' />}

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
							/>
							<ButtonUsage
								label={'Recipes'}
								parentMethod={handleNavClick('/recipes')}
							/>
							<ButtonUsage
								label={'Profile'}
								parentMethod={handleNavClick('/profile')}
							/>
						</>
					) : (
						<>
							<ButtonUsage
								label='Login'
								parentMethod={() => console.log('login')}
							/>
							<ButtonUsage
								label='Register'
								parentMethod={() => console.log('Register')}
							/>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
});
