import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/features/home/components/forms/RegisterForm';
import { LoginForm } from '@/features/home/components/forms/LoginForm';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

export const AuthModal = () => {
	const [showRegister, setShowRegister] = useState(false);

	const handleLoginSuccess = () => {
		setIsLoading(true);
		setLogged(true);
		nav('/recipes');
	};

	const [isLoading, setIsLoading] = useState(false);
	const { setLogged } = useLoggedContext();
	const nav = useNavigate();

	const handleRegisterSuccess = () => {
		setShowRegister(false);
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: 200,
				}}>
				<CircularProgress color='primary' />
				<Typography sx={{ ml: 2 }}>Signing in</Typography>
			</Box>
		);
	}

	return (
		<>
			{showRegister ? (
				<RegisterForm
					onSuccess={handleRegisterSuccess}
					className='bg-neutral-200'
				/>
			) : (
				<LoginForm onSuccess={handleLoginSuccess} className='bg-neutral-200' />
			)}

			<Button
				variant='text'
				sx={{
					mt: 3,
					fontWeight: 'bold',
					textDecoration: 'underline',
					color: 'black',
				}}
				onClick={() => setShowRegister((prev) => !prev)}>
				{showRegister ? 'Have an account? Sign in' : 'No account yet? Sign up'}
			</Button>
		</>
	);
};
