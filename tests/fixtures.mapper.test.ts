import { describe, it, expect } from 'vitest';
import { mapPandaScoreMatchToDomain, PandaScoreMatchItem } from '../server/providers/pandascore/mapper';

describe('PandaScore Provider Mapper', () => {
  it('should map valid PandaScore match to Match domain model', () => {
    const rawMatch: PandaScoreMatchItem = {
      id: 998877,
      name: 'FaZe vs Vitality',
      begin_at: '2026-10-20T18:00:00Z',
      scheduled_at: '2026-10-20T18:00:00Z',
      status: 'finished',
      league: { name: 'ESL Pro League' },
      serie: { name: 'Season 21' },
      opponents: [
        {
          opponent: {
            id: 101,
            name: 'FaZe Clan',
            acronym: 'FAZE',
            image_url: 'https://cdn.pandascore.co/images/team/image/101/faze.png',
          },
        },
        {
          opponent: {
            id: 102,
            name: 'Team Vitality',
            acronym: 'VIT',
            image_url: 'https://cdn.pandascore.co/images/team/image/102/vitality.png',
          },
        },
      ],
      results: [
        { team_id: 101, score: 2 },
        { team_id: 102, score: 1 },
      ],
    };

    const match = mapPandaScoreMatchToDomain(rawMatch, 'cs2');

    expect(match).not.toBeNull();
    expect(match?.id).toBe('ps:998877');
    expect(match?.gameId).toBe('cs2');
    expect(match?.tournamentName).toBe('ESL Pro League Season 21');
    expect(match?.status).toBe('completed');
    expect(match?.teamA.name).toBe('FaZe Clan');
    expect(match?.teamB.name).toBe('Team Vitality');
    expect(match?.score?.teamA).toBe(2);
    expect(match?.score?.teamB).toBe(1);
  });

  it('should return null when opponents are less than 2', () => {
    const rawIncompleteMatch: PandaScoreMatchItem = {
      id: 111,
      name: 'TBD match',
      begin_at: null,
      scheduled_at: null,
      status: 'not_started',
      league: { name: 'Major' },
      serie: { name: 'Qualifier' },
      opponents: [
        {
          opponent: {
            id: 101,
            name: 'FaZe Clan',
            acronym: 'FAZE',
            image_url: null,
          },
        },
      ],
    };

    const match = mapPandaScoreMatchToDomain(rawIncompleteMatch, 'cs2');
    expect(match).toBeNull();
  });
});
