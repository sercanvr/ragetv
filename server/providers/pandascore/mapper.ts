import { Match, MatchTeam } from '../../../shared/schemas/fixture';
import { GameId } from '../../../shared/schemas/game';

export interface PandaScoreOpponent {
  opponent: {
    id: number;
    name: string;
    acronym: string | null;
    image_url: string | null;
  };
}

export interface PandaScoreMatchItem {
  id: number;
  name: string;
  begin_at: string | null;
  scheduled_at: string | null;
  status: 'not_started' | 'running' | 'finished';
  league: { name: string };
  serie: { name: string };
  opponents: PandaScoreOpponent[];
  results?: Array<{ team_id: number; score: number }>;
}

export function mapPandaScoreMatchToDomain(
  item: PandaScoreMatchItem,
  gameId: GameId
): Match | null {
  if (!item.opponents || item.opponents.length < 2) {
    return null;
  }

  const firstOpponent = item.opponents[0]?.opponent;
  const secondOpponent = item.opponents[1]?.opponent;

  if (!firstOpponent || !secondOpponent) return null;

  const teamA: MatchTeam = {
    id: String(firstOpponent.id),
    name: firstOpponent.name || 'TBD',
    acronym: firstOpponent.acronym || firstOpponent.name.slice(0, 3).toUpperCase(),
    logoUrl: firstOpponent.image_url || null,
  };

  const teamB: MatchTeam = {
    id: String(secondOpponent.id),
    name: secondOpponent.name || 'TBD',
    acronym: secondOpponent.acronym || secondOpponent.name.slice(0, 3).toUpperCase(),
    logoUrl: secondOpponent.image_url || null,
  };

  let status: Match['status'] = 'upcoming';
  if (item.status === 'running') status = 'running';
  if (item.status === 'finished') status = 'completed';

  let score: Match['score'] = null;
  if (item.results && item.results.length >= 2) {
    const scoreA = item.results.find((r) => r.team_id === firstOpponent.id)?.score ?? 0;
    const scoreB = item.results.find((r) => r.team_id === secondOpponent.id)?.score ?? 0;
    score = { teamA: scoreA, teamB: scoreB };
  }

  const scheduled = item.begin_at || item.scheduled_at || new Date().toISOString();
  const tournamentTitle = `${item.league?.name || ''} ${item.serie?.name || ''}`.trim() || 'Premier Tournament';

  return {
    id: `ps:${item.id}`,
    gameId,
    tournamentName: tournamentTitle,
    scheduledAt: scheduled,
    status,
    teamA,
    teamB,
    score,
    streamUrl: null,
  };
}
