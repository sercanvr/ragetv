import { VodItem } from '../../../shared/schemas/stream';

export interface YouTubePlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: { url: string };
    medium?: { url: string };
    high?: { url: string };
    maxres?: { url: string };
  };
  resourceId: {
    kind: string;
    videoId: string;
  };
}

export function mapYouTubePlaylistItemToVod(
  item: { snippet?: YouTubePlaylistItemSnippet }
): VodItem | null {
  if (!item.snippet || !item.snippet.resourceId || !item.snippet.resourceId.videoId) {
    return null;
  }

  const snippet = item.snippet;
  const videoId = snippet.resourceId.videoId;
  const thumbnail =
    snippet.thumbnails.maxres?.url ||
    snippet.thumbnails.high?.url ||
    snippet.thumbnails.medium?.url ||
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    id: `yt:${videoId}`,
    platform: 'youtube',
    videoId,
    title: snippet.title || 'Championship Tournament Match',
    publishedAt: snippet.publishedAt || new Date().toISOString(),
    thumbnailUrl: thumbnail,
  };
}
