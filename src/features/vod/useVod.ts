import { useQuery } from '@tanstack/react-query';
import { fetchGameVod } from './api';

export function useVod(gameSlug: string) {
  return useQuery({
    queryKey: ['vod', gameSlug],
    queryFn: () => fetchGameVod(gameSlug),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
  });
}
