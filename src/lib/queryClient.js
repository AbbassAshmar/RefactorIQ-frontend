import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient instance.
 * Sensible defaults for stale time, retries, etc.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,         // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
