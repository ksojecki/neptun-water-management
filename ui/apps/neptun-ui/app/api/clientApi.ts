import { SystemState } from '@neptun/data-model';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3333/api';
const REFRESH_INTERVAL = 1000 * 10;

const OFFLINE_STATE: SystemState = {
  status: 'Offline',
  sources: []
};

export const useSystemState = (refresh: number = REFRESH_INTERVAL) => {
  const { data, queryState  } = useQuery<SystemState>('water', refresh);
  return { queryState, systemState: data ?? OFFLINE_STATE };
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const query = async <T>(endpoint: string):Promise<T> => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    await wait(4000);
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

type QueryState = 'loading' | 'error' | 'success';

const useQuery = <T>(endpoint:string, refresh: number) => {
  const [data, setData] = useState<T>();
  const [queryState, setQueryState] = useState<QueryState>('loading');

  useEffect(() => {
    query<T>(endpoint)
      .then(state => setData(state))
      .then(() => setQueryState('success'))
      .catch(() => setQueryState('error'));
  }, [endpoint])

  return { data, queryState };
}
