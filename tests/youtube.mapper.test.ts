import { describe, it, expect } from 'vitest';
import { mapYouTubePlaylistItemToVod } from '../server/providers/youtube/mapper';

describe('YouTube Provider Mapper', () => {
  it('should map playlist item with maxres thumbnail to VodItem', () => {
    const rawPlaylistItem = {
      snippet: {
        publishedAt: '2026-10-15T18:00:00Z',
        channelId: 'UCsomething',
        title: 'IEM Rio Grand Final - Navi vs Vitality',
        description: 'Watch the epic grand final match.',
        thumbnails: {
          maxres: { url: 'https://i.ytimg.com/vi/abc1234/maxresdefault.jpg' },
          high: { url: 'https://i.ytimg.com/vi/abc1234/hqdefault.jpg' },
        },
        resourceId: {
          kind: 'youtube#video',
          videoId: 'abc1234',
        },
      },
    };

    const vod = mapYouTubePlaylistItemToVod(rawPlaylistItem);

    expect(vod).not.toBeNull();
    expect(vod?.id).toBe('yt:abc1234');
    expect(vod?.platform).toBe('youtube');
    expect(vod?.videoId).toBe('abc1234');
    expect(vod?.title).toBe('IEM Rio Grand Final - Navi vs Vitality');
    expect(vod?.thumbnailUrl).toBe('https://i.ytimg.com/vi/abc1234/maxresdefault.jpg');
  });

  it('should return null when videoId is missing', () => {
    const invalidItem = {
      snippet: {
        publishedAt: '2026-10-15T18:00:00Z',
        channelId: 'UCsomething',
        title: 'Broken item',
        description: '',
        thumbnails: {},
        resourceId: {
          kind: 'youtube#video',
          videoId: '',
        },
      },
    };

    const vod = mapYouTubePlaylistItemToVod(invalidItem);
    expect(vod).toBeNull();
  });
});
