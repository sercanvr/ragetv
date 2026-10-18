import { VodItem } from '../../../shared/schemas/stream';
import { mapYouTubePlaylistItemToVod } from './mapper';

export async function fetchLatestYouTubePlaylistVod(
  apiKey: string,
  playlistId: string
): Promise<VodItem | null> {
  if (!apiKey || !playlistId) return null;

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('maxResults', '1');
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('key', apiKey);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url.toString(), {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as { items?: unknown[] };
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return null;
    }

    const firstItem = data.items[0];
    return mapYouTubePlaylistItemToVod(firstItem as Parameters<typeof mapYouTubePlaylistItemToVod>[0]);
  } catch {
    return null;
  }
}
