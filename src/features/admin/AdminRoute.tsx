import { Navigate, Outlet } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import { Box, CircularProgress, Typography } from '@mui/material';

const AdminRoute = () => {
	const { logged, isLoading, isAdmin } = useLoggedContext();

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
					Checking admin privileges...
				</Typography>
			</Box>
		);
	}

	if (!logged) return <Navigate to='/' replace />;
	if (!isAdmin) return <Navigate to='/' replace />;

	return <Outlet />;
};

export default AdminRoute;
