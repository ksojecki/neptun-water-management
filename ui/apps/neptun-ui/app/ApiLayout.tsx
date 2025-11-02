import { Outlet, useNavigate, useNavigation } from 'react-router';
import {
  AuthenticationProvider,
  useAuthentication,
} from './api/authentication';
import { CenterLayout } from '@ui/layout/centerLayout';
import { ReactNode, useEffect } from 'react';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoading, user } = useAuthentication();
  const navigation = useNavigation();
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoading) return;
    if (user) return;

    if(navigation.location?.pathname !== '/login' ) {
      navigate("/login");
    }
  }, [isLoading, navigate, navigation.location?.pathname, user]);
  return <CenterLayout>
    { isLoading? null: children }
  </CenterLayout>
};

const ApiLayout = () => {
  /** Move to context **/
  const navigate = useNavigate();
  const navigation = useNavigation();

  const onUnauthenticated = () => {
    if(navigation.location?.pathname !== '/login' ) {
      navigate("/login");
    }
  }

  const onLogin = () => {
    if(navigation.location?.pathname === '/login' ) {
      navigate("/");
    }
  }

  return (
    <AuthenticationProvider onLogout={onUnauthenticated} onLogin={onLogin}>
      <AuthWrapper><Outlet /></AuthWrapper>
    </AuthenticationProvider>
  );
};

export default ApiLayout;
