import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3333/api';

export type QueryState = 'loading' | 'error' | 'success' | 'idle';

type UseQueryParams<TPayload> = {
  endpoint: string;
  body?: TPayload;
  isEnabled?: boolean;
};

export const useQuery =
  <TResponse, TPayload = undefined>({
    endpoint,
    body,
    isEnabled = true,
  }: UseQueryParams<TPayload>) => {

  const [data, setData] = useState<TResponse>();
  const [queryState, setQueryState] = useState<QueryState>('idle');

  useEffect(() => {
    if(!isEnabled) return;

    setQueryState('loading');
    query<TResponse, TPayload>(endpoint, body)
      .then((state) => setData(state))
      .then(() => setQueryState('success'))
      .catch(() => setQueryState('error'));
  }, [body, endpoint, isEnabled]);

  return { data, queryState };
};

const query = async <TResponse, TPayload>(
  endpoint: string,
  payload?: TPayload
): Promise<TResponse> => {
  try {
    const postOptions: RequestInit | undefined = payload
      ? {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      : undefined;

    const response = await fetch(`${API_URL}/${endpoint}`, postOptions);
    return (await response.json()) as TResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
