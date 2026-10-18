import { Hono } from 'hono';
import { GAMES_REGISTRY } from '../shared/registry/games';

export const app = new Hono().basePath('/api');

// Health endpoint (public version and uptime check)
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    supportedGames: GAMES_REGISTRY.length,
  });
});

// Live status endpoint skeleton with edge caching headers (M1 placeholder -> M2 full adapter)
app.get('/live', (c) => {
  c.header('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

  const gamesData: Record<string, { live: unknown[]; fallbackVod: unknown }> = {};
  for (const game of GAMES_REGISTRY) {
    gamesData[game.slug] = {
      live: [],
      fallbackVod: game.vodSource.defaultVideoId
        ? {
            id: `yt:${game.vodSource.defaultVideoId}`,
            platform: 'youtube',
            videoId: game.vodSource.defaultVideoId,
            title: `${game.name} Recent Tournament Match`,
            publishedAt: new Date().toISOString(),
            thumbnailUrl: `https://i.ytimg.com/vi/${game.vodSource.defaultVideoId}/hqdefault.jpg`,
          }
        : null,
    };
  }

  return c.json({
    fetchedAt: new Date().toISOString(),
    stale: false,
    games: gamesData,
  });
});

export default app;
