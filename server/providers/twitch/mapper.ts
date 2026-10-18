import { Stream } from '../../../shared/schemas/stream';

export interface TwitchHelixStreamItem {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string; // 'live'
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
}

export function mapTwitchStreamToDomain(item: TwitchHelixStreamItem): Stream {
  return {
    id: `twitch:${item.user_login.toLowerCase()}`,
    platform: 'twitch',
    channel: item.user_login.toLowerCase(),
    title: item.title || `${item.user_name} Live Stream`,
    language: item.language || 'en',
    official: true,
    viewers: typeof item.viewer_count === 'number' ? item.viewer_count : null,
    thumbnailUrl: item.thumbnail_url
      ? item.thumbnail_url.replace('{width}', '640').replace('{height}', '360')
      : null,
  };
}
