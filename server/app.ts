import { Hono } from 'hono';
import { GAMES_REGISTRY } from '../shared/registry/games';
import { liveRouter } from './routes/live';
import { vodRouter } from './routes/vod';
import { fixturesRouter } from './routes/fixtures';

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

// Mount /api/live, /api/vod, and /api/fixtures
app.route('/live', liveRouter);
app.route('/vod', vodRouter);
app.route('/fixtures', fixturesRouter);

export default app;
