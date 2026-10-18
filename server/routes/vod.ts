import { Hono } from 'hono';
import { getGameBySlug } from '../../shared/registry/games';
import { getServerEnv } from '../lib/env';
import { fetchLatestYouTubePlaylistVod } from '../providers/youtube/client';
import { VodItem } from '../../shared/schemas/stream';

export const vodRouter = new Hono();

vodRouter.get('/', async (c) => {
  // CDN Cache: 10 minutes edge cache, 1 hour stale-while-revalidate
  c.header('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');

  const gameSlug = c.req.query('game');
  if (!gameSlug) {
    return c.json({ error: 'Missing game query parameter' }, 400);
  }

  const game = getGameBySlug(gameSlug);
  if (!game) {
    return c.json({ error: 'Unknown game slug' }, 404);
  }

  const env = getServerEnv();
  let vod: VodItem | null = null;

  // Try fetching latest from playlist if playlistId & apiKey exist
  if (env.YOUTUBE_API_KEY && game.vodSource.playlistId) {
    vod = await fetchLatestYouTubePlaylistVod(env.YOUTUBE_API_KEY, game.vodSource.playlistId);
  }

  // Guaranteed fallback to verified default championship video
  if (!vod && game.vodSource.defaultVideoId) {
    const videoId = game.vodSource.defaultVideoId;
    vod = {
      id: `yt:${videoId}`,
      platform: 'youtube',
      videoId,
      title: `${game.name} — Championship Tournament Grand Finals`,
      publishedAt: new Date().toISOString(),
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    };
  }

  return c.json({
    fetchedAt: new Date().toISOString(),
    game: game.slug,
    vod,
  });
});
