import { ApiError, SystemState } from '@neptun/data-model';
import { useQuery } from './query';

const OFFLINE_STATE: SystemState = {
  type: 'success',
  status: 'Offline',
  sources: []
};

export const useSystemState = () => {
  const { data, queryState  } = useQuery<SystemState | ApiError>({ endpoint: 'state' });
  return { queryState, systemState: data ?? OFFLINE_STATE };
}
