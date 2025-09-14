import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { memo } from 'react';
import { AppBar, Toolbar, Box, CircularProgress } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';

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

	const handleNavClick = (path: string) => {
		if (isLoading || !path) return;
		return () => nav(path);
	};

	return (
		<AppBar position='static' component='nav' sx={{ width: '100%', pr: 4 }}>
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
					<img
						src='/logo.png'
						alt='Chefify Logo'
						style={{ width: '100px', height: 'auto' }}
					/>
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
						<ButtonUsage
							label='Sign In'
							parentMethod={() => openModal('auth')}
						/>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
});
