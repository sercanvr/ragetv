import { Hono } from 'hono';
import { getGameBySlug } from '../../shared/registry/games';
import { getVerifiedFallbackFixtures } from '../../shared/registry/fixtures';
import { getServerEnv } from '../lib/env';
import { fetchPandaScoreMatches } from '../providers/pandascore/client';
import { FixturesResponse, Match } from '../../shared/schemas/fixture';

export const fixturesRouter = new Hono();

fixturesRouter.get('/', async (c) => {
  // CDN Cache: 2 minutes edge cache, 10 minutes stale-while-revalidate
  c.header('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');

  const gameSlug = c.req.query('game');
  if (!gameSlug) {
    return c.json({ error: 'Missing game query parameter' }, 400);
  }

  const game = getGameBySlug(gameSlug);
  if (!game) {
    return c.json({ error: 'Unknown game slug' }, 404);
  }

  const env = getServerEnv();
  let matches = { upcoming: [] as Match[], results: [] as Match[] };

  if (env.PANDASCORE_TOKEN) {
    matches = await fetchPandaScoreMatches(env.PANDASCORE_TOKEN, game.id);
  }

  // Resilient fallback to verified fixtures if upstream has no matches
  const fallback = getVerifiedFallbackFixtures(game.slug);
  if (matches.upcoming.length === 0) {
    matches.upcoming = fallback.upcoming;
  }
  if (matches.results.length === 0) {
    matches.results = fallback.results;
  }

  const response: FixturesResponse = {
    fetchedAt: new Date().toISOString(),
    game: game.slug,
    upcoming: matches.upcoming,
    results: matches.results,
  };

  return c.json(response);
});
