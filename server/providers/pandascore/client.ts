import { Match } from '../../../shared/schemas/fixture';
import { GameId } from '../../../shared/schemas/game';
import { mapPandaScoreMatchToDomain, PandaScoreMatchItem } from './mapper';

const GAME_ENDPOINT_MAP: Record<GameId, string> = {
  cs2: 'csgo', // Architecture rule D2/Bölüm 9: CS2 uses csgo prefix on PandaScore
  valorant: 'valorant',
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
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const [upcomingRes, pastRes] = await Promise.all([
      fetch(`https://api.pandascore.co/${endpointPrefix}/matches/upcoming?sort=begin_at&per_page=5`, {
        headers,
        signal: controller.signal,
      }),
      fetch(`https://api.pandascore.co/${endpointPrefix}/matches/past?sort=-begin_at&per_page=5`, {
        headers,
        signal: controller.signal,
      }),
    ]);
    clearTimeout(timeout);

    const upcomingItems: PandaScoreMatchItem[] = upcomingRes.ok
      ? ((await upcomingRes.json()) as PandaScoreMatchItem[])
      : [];
    const pastItems: PandaScoreMatchItem[] = pastRes.ok
      ? ((await pastRes.json()) as PandaScoreMatchItem[])
      : [];

    const upcoming = (Array.isArray(upcomingItems) ? upcomingItems : [])
      .map((item) => mapPandaScoreMatchToDomain(item, gameId))
      .filter((m): m is Match => m !== null);

    const results = (Array.isArray(pastItems) ? pastItems : [])
      .map((item) => mapPandaScoreMatchToDomain(item, gameId))
      .filter((m): m is Match => m !== null);

    return { upcoming, results };
  } catch {
    return { upcoming: [], results: [] };
  }
}
