import { useSystemState } from '../api/clientApi';
import { Dashboard } from '../components/dashboard/dashboard';
import { CenterLayout } from '../components/centerLayout';
import { Error } from '../components/error';
import { Loading } from '../components/loading';

export function SystemDashboard() {
  const { systemState, queryState } = useSystemState();

  return (
    <CenterLayout>
      { (queryState === 'success') && <Dashboard systemState={systemState} /> }
      { (queryState === 'loading') && <Loading /> }
      { (queryState === 'error') && <Error message='Cannot load system state' /> }
    </CenterLayout>
  );
}

export default SystemDashboard;
