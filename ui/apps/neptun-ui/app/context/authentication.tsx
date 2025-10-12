import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  AuthCredentials,
  AuthenticationResponse,
  UserInfo,
} from '@neptun/data-model';
import { QueryState, useQuery } from '../api/query';

type AuthenticationContextType = {
  queryState: QueryState;
  user: UserInfo | null;
  login: (user: AuthCredentials) => void;
};

const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

type AuthenticationProviderProps = {
  children: ReactNode | ReactNode[];
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
}

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [ user, setUser ] = useState<UserInfo | null>(null);
  const [ credentials, setCredentials ] = useState<AuthCredentials | null>(null);
  const { data, queryState } = useQuery<AuthenticationResponse, AuthCredentials | null>({ endpoint: 'login', body: credentials, isEnabled: !!credentials} );

  const login = (newCredentials: AuthCredentials) => {
    setCredentials(newCredentials);
  }

  useEffect(() => {
    if(data?.type === 'success') {
      setUser(data.user)
    }
  }, [data])

  return <AuthenticationContext.Provider value={{queryState, user, login}} >
    {children}
  </AuthenticationContext.Provider>
}
