import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/features/home/components/forms/RegisterForm';
import { LoginForm } from '@/features/home/components/forms/LoginForm';
import { Button } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';

export const AuthModal = () => {
	const [showRegister, setShowRegister] = useState(false);
	const { setLogged } = useLoggedContext();
	const { closeModal } = useModalContext();
	const nav = useNavigate();

	const handleLoginSuccess = () => {
		setLogged(true);
		closeModal();
		nav('/recipes');
	};

	const handleRegisterSuccess = () => {
		setShowRegister(false);
	};

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
