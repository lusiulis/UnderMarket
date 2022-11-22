import { createContext, ReactElement } from 'react';
import { IAuthContext } from '../Hooks/auth';
import { useAuthContext } from '../Hooks/auth/useAuthContext';

type IAuthContextProps = {
  children: ReactElement
}

export const AuthContext = createContext<IAuthContext>({
  authState: {isAunthenticated: false},
  setAuthenticatedUser: () => {},
  logOut: () => {}
});
export const AuthContextProvider = ({children}: IAuthContextProps) => {
  const appContext = useAuthContext();
  return (
    <AuthContext.Provider value={ appContext }>
      {children}
    </AuthContext.Provider>
  );
};
