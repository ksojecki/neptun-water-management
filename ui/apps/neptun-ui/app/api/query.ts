import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3333/api';

type QueryState = 'loading' | 'error' | 'success';

export const useQuery = <T>(endpoint:string, refresh: number) => {
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

const query = async <T>(endpoint: string):Promise<T> => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
