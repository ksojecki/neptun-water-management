import { useAuthentication } from './api/authentication';
import { Outlet } from 'react-router';
import { CenterLayout } from '@ui/layout/centerLayout';
import { Menu } from '@ui/menu';
import { FaTools, FaUser } from 'react-icons/fa';
import { Modal } from '@ui/Modal';
import { useState } from 'react';

export const DashboardLayout = () => {
  const { isLoading, user, logout } = useAuthentication();
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const openConfig = () => setShowConfig(true);

  const goToGithub = () => {
    window.open(
      'https://github.com/ksojecki/neptun-water-management',
      '_blank'
    );
  };
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
        {user && (
          <Menu.Link tooltip="Logout" onClick={logout}>
            <FaUser />
          </Menu.Link>
        )}
        {user && (
          <Menu.Link tooltip="Settings" onClick={openConfig}>
            <FaTools />
          </Menu.Link>
        )}
        <Menu.ToggleTheme tooltip={'Change theme'} />
      </Menu>
      <Modal open={showConfig} onClosed={() => setShowConfig(false)} />
    </>
  );
};
