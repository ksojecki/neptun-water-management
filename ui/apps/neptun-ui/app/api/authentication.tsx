'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  AuthCredentials,
  AuthenticationResponse,
  UserInfo,
} from '@neptun/data-model';
import { useQuery } from './query';

type AuthenticationContextType = {
  user: UserInfo | undefined;
  token: string | undefined;
  login: (user: AuthCredentials) => void;
};

type AuthenticationProviderProps = {
  children: ReactNode | ReactNode[];
};

type AuthenticationState =
  | {
  type: 'authenticated';
  user: UserInfo;
  token: string;
}
  | {
  type: 'inProgress';
  credentials: AuthCredentials;
}
  | {
  type: 'notAuthenticated';
};

type AuthActions =
  | { type: 'authRequest'; credentials: AuthCredentials }
  | { type: 'authResponse'; user: UserInfo; token: string }
  | { type: 'forgetUser' };

const AuthenticationContext = createContext<AuthenticationContextType | null>(
  null
);

const savedData = {
  set(token: string, user: UserInfo) {
    // localStorage?.setItem('token', token);
    // localStorage?.setItem('userInfo', token);
  },
  getAuthState(): AuthenticationState {
    /*const token = localStorage?.getItem('token');
    const user = localStorage?.getItem('userInfo');
    if (token && user) {
      return {
        type: 'authenticated',
        user: JSON.parse(user),
        token,
      };
    }*/
    return { type: 'notAuthenticated' };
  },
  remove() {
    // localStorage.removeItem('token');
  }
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider'
    );
  }
  return context;
};

const authenticationReducer = (
  state: AuthenticationState,
  actions: AuthActions
): AuthenticationState => {
  switch (actions.type) {
    case 'forgetUser':
      savedData.remove();
      return { type: 'notAuthenticated' };
    case 'authRequest':
      return { type: 'inProgress', credentials: actions.credentials };
    case 'authResponse':
      savedData.set(actions.token, actions.user);
      return {
        type: 'authenticated',
        user: actions.user,
        token: actions.token,
      };
    default:
      return state;
  }
};

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [authenticationState, dispatcher] = useReducer(authenticationReducer,
    savedData.getAuthState());
  const body =
    authenticationState.type === 'inProgress'
      ? authenticationState.credentials
      : undefined;
  const isEnabled = authenticationState.type === 'inProgress';
  const { data, queryState } = useQuery<
    AuthenticationResponse,
    AuthCredentials | null
  >({ endpoint: 'authentication/get-token', body, isEnabled });

  const login = (credentials: AuthCredentials) => {
    dispatcher({
      type: 'authRequest',
      credentials,
    });
  };

  useEffect(() => {
    if (
      authenticationState.type !== 'inProgress' &&
      queryState !== 'received' &&
      queryState !== 'error'
    ) {
      return;
    }
    if (data?.type === 'success') {
      dispatcher({
        type: 'authResponse',
        user: data.user,
        token: data.token,
      });
    } else {
      dispatcher({
        type: 'forgetUser',
      });
    }
  }, [authenticationState.type, data, queryState]);

  const user = authenticationState.type === 'authenticated' ? authenticationState.user : undefined;
  const token = authenticationState.type === 'authenticated' ? authenticationState.token : undefined;
  return (
    <AuthenticationContext.Provider value={{ user, token, login }}>
      {children}
    </AuthenticationContext.Provider>
  );
};


