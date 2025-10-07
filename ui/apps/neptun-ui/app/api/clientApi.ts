import { SystemState } from '@neptun/data-model';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3333/api';
const REFRESH_INTERVAL = 1000 * 10;

export const useSystemState = (refresh: number = REFRESH_INTERVAL) => {
  const { data, isLoading, error } = useQuery<SystemState>('water', refresh);
  return { isLoading, systemState: data, error };
}

const query = async <T>(endpoint: string):Promise<T> => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

const useQuery = <T>(endpoint:string, refresh: number) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    query<T>(endpoint)
      .then(state => setData(state))
      .then(() => setIsLoading(false))
      .catch(() => setError(true));
  }, [endpoint])

  return { data, isLoading, error};
}
