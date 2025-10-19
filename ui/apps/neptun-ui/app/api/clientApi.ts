import {
  ApiError,
  ApiResponse,
  SystemState,
} from '@neptun/data-model';
import { useQuery } from './query';
import { useAuthentication } from './authentication';
import { useEffect, useState } from 'react';

type EndpointName = 'state'

const useApi = <T extends object>(endpoint: EndpointName) => {
  const { token } = useAuthentication();
  const [ error, setError ] = useState<Error | ApiError | undefined>(undefined);
  const [ payload, setPayload ] = useState<T | undefined>(undefined);
  const { data, queryState, queryError } = useQuery<ApiResponse<T>>({ endpoint, apiToken: token });
  useEffect(() => {
    if (queryState === 'idle') {
      setError(undefined);
      setPayload(undefined);
      return;
    }

    if (queryState === 'loading') {
      setError(undefined);
      return;
    }

    if (queryState === 'error') {
      setError(queryError as Error);
      return;
    }

    if (data?.type === 'error') {
      setError(data);
      return;
    }
    if (data?.type === 'success' && data.data !== undefined) {
      setError(undefined);
      setPayload(data.data);
      return;
    }
    setError({ name: 'clientApiError', message: 'Invalid data envelope' });
  }, [data, queryError, queryState]);
  return { payload, error };
}

export const useSystemState = () => {
  const apiParams = useApi<SystemState>('state')
  return { systemState: apiParams.payload, error: apiParams.error };
};
