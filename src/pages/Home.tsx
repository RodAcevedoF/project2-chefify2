import { useState } from 'react';
import { LoginForm } from '../components/ui/forms/LoginForm';
import { RegisterForm } from '../components/ui/forms/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useLoggedContext } from '../contexts/loggedContext/logged.context';

export const Home = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setLogged } = useLoggedContext();
  const nav = useNavigate();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        <span className='ml-4'>Signing in</span>
      </div>
    );
  }

  const handleLoginSuccess = () => {
    console.log('🎉 Login completed');
    setIsLoading(true);
    setLogged(true);
    nav('/recipes');
  };

  const handleRegisterSuccess = () => {
    console.log('🎉 Register completed');
    setShowRegister(false);
  };

  return (
    <section className='h-full w-full flex items-center justify-center border-2 border-blue-500 p-10 gap-10'>
      <div className='text-center w-1/2'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>
          Welcome to Chefify! 👨‍🍳
        </h1>
        <p className='text-gray-600 text-lg'>
          Your culinary journey starts here. Please log in or register to
          continue.
        </p>
      </div>
      <div>
        {showRegister ? (
          <RegisterForm onSuccess={handleRegisterSuccess} />
        ) : (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}

        <button
          className='mt-4 text-blue-600 hover:underline'
          onClick={() => setShowRegister((prev) => !prev)}>
          {showRegister
            ? 'Have an account? Sign in'
            : 'No account yet? Sign up'}
        </button>
      </div>
    </section>
  );
};
