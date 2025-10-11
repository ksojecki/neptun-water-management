import { SystemState } from '@neptun/data-model';
import { useQuery } from './query';

const REFRESH_INTERVAL = 1000 * 10;

const OFFLINE_STATE: SystemState = {
  status: 'Offline',
  sources: []
};

export const useSystemState = (refresh: number = REFRESH_INTERVAL) => {
  const { data, queryState  } = useQuery<SystemState>('water', refresh);
  return { queryState, systemState: data ?? OFFLINE_STATE };
}

export const authenticate = () => {

}
