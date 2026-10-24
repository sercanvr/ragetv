import { Hono } from 'hono';
import { GAMES_REGISTRY } from '../../shared/registry/games';
import { isChannelBlocked, isGameBlocked } from '../../shared/registry/killswitch';
import { Stream, LiveStatusResponse } from '../../shared/schemas/stream';
import { getServerEnv } from '../lib/env';
import { CircuitBreaker } from '../lib/circuitBreaker';
import { fetchTwitchLiveStreams } from '../providers/twitch/client';
import { checkYouTubeChannelLive } from '../providers/youtube/client';

export const liveRouter = new Hono();
const twitchBreaker = new CircuitBreaker({ failureThreshold: 3, cooldownPeriodMs: 30_000 });

let lastSuccessfulResponse: LiveStatusResponse | null = null;

liveRouter.get('/', async (c) => {
  // CDN Caching Headers (30s edge cache, 60s stale-while-revalidate)
  c.header('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

  const env = getServerEnv();
  const allTwitchLogins = GAMES_REGISTRY
    .filter((g) => !isGameBlocked(g.id))
    .flatMap((g) =>
      g.channels
        .filter((ch) => ch.platform === 'twitch' && !isChannelBlocked(ch.login))
        .map((ch) => ch.login)
    );

  let liveStreams: Stream[] = [];

  if (env.TWITCH_CLIENT_ID && env.TWITCH_CLIENT_SECRET) {
    if (!twitchBreaker.canExecute() && lastSuccessfulResponse) {
      return c.json({ ...lastSuccessfulResponse, stale: true });
    }

    try {
      liveStreams = await fetchTwitchLiveStreams(
        env.TWITCH_CLIENT_ID,
        env.TWITCH_CLIENT_SECRET,
        allTwitchLogins
      );
      twitchBreaker.recordSuccess();
    } catch {
      twitchBreaker.recordFailure();
      if (lastSuccessfulResponse) {
        return c.json({ ...lastSuccessfulResponse, stale: true });
      }
    }
  }

  // Check registered official YouTube channels for active live broadcasts
  const allYouTubeChannels = GAMES_REGISTRY
    .filter((g) => !isGameBlocked(g.id))
    .flatMap((g) =>
      g.channels
        .filter((ch) => ch.platform === 'youtube' && !isChannelBlocked(ch.login))
        .map((ch) => ({ gameId: g.id, login: ch.login, language: ch.language }))
    );

  const youtubeStreams: { gameId: string; stream: Stream }[] = [];

  for (const yt of allYouTubeChannels) {
    try {
      const ytStream = await checkYouTubeChannelLive(yt.login, yt.language);
      if (ytStream) {
        youtubeStreams.push({ gameId: yt.gameId, stream: ytStream });
      }
    } catch {
      // Ignore individual channel check failures
    }
  }

  // Group streams by game
  const gamesData: LiveStatusResponse['games'] = {};

  for (const game of GAMES_REGISTRY) {
    const gameTwitchLogins = game.channels
      .filter((ch) => ch.platform === 'twitch')
      .map((ch) => ch.login.toLowerCase());

    const activeTwitchStreams = liveStreams.filter((stream) =>
      gameTwitchLogins.includes(stream.channel.toLowerCase())
    );

    const activeYtStreams = youtubeStreams
      .filter((item) => item.gameId === game.id)
      .map((item) => item.stream);

    const activeGameStreams = [...activeTwitchStreams, ...activeYtStreams];

    gamesData[game.slug] = {
      live: activeGameStreams,
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

  const response: LiveStatusResponse = {
    fetchedAt: new Date().toISOString(),
    stale: false,
    games: gamesData,
  };

  lastSuccessfulResponse = response;
  return c.json(response);
});
