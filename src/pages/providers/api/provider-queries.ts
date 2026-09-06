import { queryOptions } from '@tanstack/react-query';

import { loadProvider } from './provider-storage';

export const providerQueries = {
  all: () => ['providers'] as const,
  configuration: () =>
    queryOptions({
      queryKey: [...providerQueries.all(), 'configuration'],
      queryFn: loadProvider,
      networkMode: 'always',
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    }),
};
