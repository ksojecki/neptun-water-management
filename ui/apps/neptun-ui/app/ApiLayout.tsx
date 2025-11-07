import { useNavigate, useNavigation } from 'react-router';
import {
  AuthenticationProvider,
} from './api/authentication';

import { DashboardLayout } from './DashboardLayout';

const ApiLayout = () => {
  /** Move to context **/
  const navigate = useNavigate();
  const navigation = useNavigation();

  const onUnauthenticated = () => {
    if (navigation.location?.pathname !== '/login') {
      navigate('/login');
    }
  };

  const onLogin = () => {
    if (navigation.location?.pathname === '/login') {
      navigate('/');
    }
  };

  return (
    <AuthenticationProvider onLogout={onUnauthenticated} onLogin={onLogin}>
      <DashboardLayout />
    </AuthenticationProvider>
  );
};

export default ApiLayout;
