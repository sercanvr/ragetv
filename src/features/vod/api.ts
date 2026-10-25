import { VodItem } from '@shared/schemas/stream';

export interface VodResponse {
  fetchedAt: string;
  game: string;
  vod: VodItem | null;
}

export async function fetchGameVod(gameSlug: string): Promise<VodResponse> {
  const res = await fetch(`/api/vod?game=${encodeURIComponent(gameSlug)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch VOD: ${res.status}`);
  }
  return res.json();
}
