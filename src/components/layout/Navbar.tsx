import { MainButton } from '../ui/buttons/MainButton';
import { Menu } from '../ui/menus/Menu';
import { useLogout } from '../../hooks/authHooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useLoggedContext } from '../../contexts/loggedContext/logged.context';
import { memo } from 'react';

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
    <nav className='w-full border-2'>
      {isLoading && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      )}
      <Menu>
        {logged && !isLoading ? (
          <>
            <MainButton
              label={logoutMutation.isPending ? 'Logging out...' : 'Logout'}
              parentMethod={handleLogout}
            />
            <MainButton
              label={'Recipes'}
              parentMethod={handleNavClick('/recipes')}
            />
            <MainButton
              label={'Profile'}
              parentMethod={handleNavClick('/profile')}
            />
          </>
        ) : (
          <>
            <MainButton
              label='Login'
              parentMethod={() => console.log('login')}
            />
            <MainButton
              label='Register'
              parentMethod={() => console.log('Register')}
            />
          </>
        )}
      </Menu>
    </nav>
  );
});
