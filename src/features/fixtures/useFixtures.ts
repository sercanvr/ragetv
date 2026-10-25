import { useQuery } from '@tanstack/react-query';
import { fetchGameFixtures } from './api';

export function useFixtures(gameSlug: string) {
  return useQuery({
    queryKey: ['fixtures', gameSlug],
    queryFn: () => fetchGameFixtures(gameSlug),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60_000, // 1 minute auto refresh
    retry: 2,
  });
}
