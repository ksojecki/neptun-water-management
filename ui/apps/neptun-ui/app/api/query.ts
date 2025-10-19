import { useEffect, useState } from 'react';

const API_URL = 'https://localhost:3333/api';

export type QueryState = 'loading' | 'error' | 'received' | 'idle';

type QueryParams<TPayload> = {
  endpoint: string;
  body?: TPayload;
  apiToken?: string | null;
};

interface UseQueryParams<TPayload> extends QueryParams<TPayload> {
  isEnabled?: boolean;
}

export const useQuery = <TResponse, TPayload = undefined>({
  isEnabled = true,
  apiToken,
  endpoint,
  body,
}: UseQueryParams<TPayload>) => {
  const [data, setData] = useState<TResponse>();
  const [queryState, setQueryState] = useState<QueryState>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (!isEnabled) return;
    if (queryState === 'loading' || queryState === 'received') return;

    setQueryState('loading');
    query<TResponse, TPayload>({ apiToken, endpoint, body })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .then(() => {
        setQueryState('received');
      })
      .catch((error) => {
        setQueryState('error');
        setError({ name: 'Query Processing Error', message: `Cannot process request to ${endpoint}`, cause: error } );
      });
  }, [apiToken, endpoint, body, isEnabled, queryState]);

  return { data, queryState, queryError: error };
};

const query = async <TResponse, TPayload>({
  body,
  endpoint,
  apiToken,
}: QueryParams<TPayload>): Promise<TResponse> => {
  try {
    const headers = new Headers();

    if (apiToken) {
      headers.append('Authorization', `Bearer ${apiToken}`);
    }

    if (body) {
      headers.append('Content-Type', 'application/json');
    }

    const requestOptions: RequestInit = {
      headers,
      method: body ? 'POST' : 'GET',
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);
    return (await response.json()) as TResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
