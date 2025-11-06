import { Outlet, useNavigate, useNavigation } from 'react-router';
import {
  AuthenticationProvider,
  useAuthentication,
} from './api/authentication';
import { CenterLayout } from '@ui/layout/centerLayout';
import { useEffect } from 'react';
import { Menu } from '@ui/menu';
import { FaTools, FaUser } from 'react-icons/fa';

const AuthWrapper = () => {
  const { isLoading, user, logout } = useAuthentication();
  const navigation = useNavigation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) return;
    if (user) return;

    if(navigation.location?.pathname !== '/login' ) {
      navigate("/login");
    }
  }, [isLoading, navigate, navigation.location?.pathname, user]);
  const goToGithub = () => {
    window.open('https://github.com/ksojecki/neptun-water-management', '_blank');
  }
  if (isLoading) return null;
  return (
    <>
      <CenterLayout>
        <Outlet />
      </CenterLayout>
      <Menu size={5}>
        <Menu.Link tooltip="Source code" onClick={goToGithub}>
          Source code
        </Menu.Link>
        { user && <Menu.Link tooltip="Logout" onClick={logout} >
            <FaUser/>
          </Menu.Link>
        }
        { user && <Menu.Link tooltip="Settings" onClick={console.log}>
            <FaTools />
          </Menu.Link>
        }
        <Menu.ToggleTheme tooltip={'Change theme'} />
      </Menu>
    </>
  );
};

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
      <AuthWrapper />
    </AuthenticationProvider>
  );
};

export default ApiLayout;
