import { createContext, useContext, type Dispatch } from 'react';

export type LoggedContextType = {
  logged: boolean | undefined;
  setLogged: Dispatch<React.SetStateAction<boolean | undefined>>;
  isLoading?: boolean;
};

export const LoggedContext = createContext<LoggedContextType | undefined>(
  undefined
);

export const useLoggedContext = () => {
  const context = useContext(LoggedContext);
  if (!context) throw new Error('Context is required');
  return context;
};
