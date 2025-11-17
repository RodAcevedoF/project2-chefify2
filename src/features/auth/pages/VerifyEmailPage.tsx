import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from '@/features/auth/services/auth.service';

const VerifyEmailPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [status, setStatus] = useState<
		'idle' | 'pending' | 'success' | 'error'
	>('idle');
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get('token');
		if (!token) {
			setStatus('error');
			setMessage('Missing verification token');
			return;
		}

		setStatus('pending');
		AuthService.verifyEmail(token)
			.then(() => {
				setStatus('success');
				setMessage('Email verified. You can now log in.');
				setTimeout(() => navigate('/', { replace: true }), 2200);
			})
			.catch((err) => {
				console.error('Email verification error', err);
				setStatus('error');
				setMessage('Invalid or expired verification token');
			});
	}, [location.search, navigate]);

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
			<Box sx={{ width: 420, p: 3, textAlign: 'center' }}>
				{status === 'pending' && <CircularProgress />}
				<Typography variant='h5' sx={{ mt: 2 }}>
					{status === 'success'
						? 'Email verified'
						: status === 'error'
						? 'Verification failed'
						: 'Verifying...'}
				</Typography>
				{message && (
					<Typography
						sx={{
							mt: 1,
							color: status === 'error' ? 'error.main' : 'text.primary',
						}}>
						{message}
					</Typography>
				)}
				<Box sx={{ mt: 3 }}>
					<Button variant='contained' onClick={() => navigate('/')}>
						Go home
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default VerifyEmailPage;
