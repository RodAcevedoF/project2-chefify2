import { Navigate, Outlet } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = () => {
	const { logged, isLoading } = useLoggedContext();

	if (isLoading || logged === undefined) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					gap: 2,
				}}>
				<CircularProgress color='success' />
				<Typography variant='body1' color='textSecondary'>
					Checking session...
				</Typography>
			</Box>
		);
	}
	if (!logged) {
		return <Navigate to='/' replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
