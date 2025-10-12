import { useSystemState } from '../api/clientApi';
import { Dashboard } from './components';
import { Error } from '../components/error';
import { Loading } from '../components/loading';
import { useNavigate } from 'react-router';

export function DashboardPage() {
  const navigate = useNavigate();
  const { systemState, queryState } = useSystemState();
  if(queryState === 'loading') return <Loading />;
  if(queryState === 'error') return <Error message='Cannot load system state' />;
  if(queryState === 'success') {
    if(systemState.type === 'error') {
      navigate('/login');
      return
    }
    return <Dashboard systemState={systemState} />
  }
  return <Error message='Unknown error' />;
}

export default DashboardPage;
