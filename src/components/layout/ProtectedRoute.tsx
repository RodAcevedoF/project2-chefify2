import { Navigate, Outlet } from 'react-router-dom';
import { useLoggedContext } from '../../contexts/loggedContext/logged.context';

const ProtectedRoute = () => {
  const { logged, isLoading } = useLoggedContext();

  if (isLoading || logged === undefined) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        <span className='ml-4'>Checking session...</span>
      </div>
    );
  }
  if (!logged) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
