import { useSystemState } from '../api/clientApi';
import { Dashboard } from './components';
import { ErrorMessage } from '../components/errorMessage';
import { Loading } from '../components/loading';
import { isUnauthorized } from '@neptun/data-model';
import { useNavigate } from 'react-router';

export function DashboardPage() {
  const { systemState, error } = useSystemState();
  const navigate = useNavigate();
  /** Move to context **/
  if (isUnauthorized(error)) {
    navigate("/login");
    return <Loading />;
  }
  if(error) {
    return <ErrorMessage error={error} />
  }
  if(systemState === undefined) return <Loading />;
  return <Dashboard systemState={systemState} />
}

export default DashboardPage;
