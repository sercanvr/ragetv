import { useQuery } from '@tanstack/react-query';
import { fetchLiveStatus } from './api';

export function useLiveStatus() {
  return useQuery({
    queryKey: ['liveStatus'],
    queryFn: fetchLiveStatus,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    staleTime: 25_000,
    retry: 2,
  });
}
