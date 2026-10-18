import { Match } from '../../../shared/schemas/fixture';
import { GameId } from '../../../shared/schemas/game';
import { mapPandaScoreMatchToDomain, PandaScoreMatchItem } from './mapper';

const GAME_ENDPOINT_MAP: Record<GameId, string> = {
  cs2: 'csgo', // Architecture rule D2/Bölüm 9: CS2 uses csgo prefix on PandaScore
  valorant: 'videogames/valorant',
  pubg: 'pubg',
  lol: 'lol',
  dota2: 'dota2',
};

export async function fetchPandaScoreMatches(
  token: string,
  gameId: GameId
): Promise<{ upcoming: Match[]; results: Match[] }> {
  if (!token) return { upcoming: [], results: [] };

  const endpointPrefix = GAME_ENDPOINT_MAP[gameId] || 'csgo';

  try {
    const url = new URL(`https://api.pandascore.co/${endpointPrefix}/matches`);
    url.searchParams.set('sort', '-begin_at');
    url.searchParams.set('per_page', '10');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return { upcoming: [], results: [] };
    }

    const items = (await res.json()) as PandaScoreMatchItem[];
    if (!Array.isArray(items)) {
      return { upcoming: [], results: [] };
    }

    const mapped = items
      .map((item) => mapPandaScoreMatchToDomain(item, gameId))
      .filter((m): m is Match => m !== null);

    const upcoming = mapped.filter((m) => m.status === 'upcoming' || m.status === 'running');
    const results = mapped.filter((m) => m.status === 'completed');

    return { upcoming, results };
  } catch {
    return { upcoming: [], results: [] };
  }
}
