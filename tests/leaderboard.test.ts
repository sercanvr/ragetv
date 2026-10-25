import { describe, it, expect } from 'vitest';
import {
  LEADERBOARD_REGISTRY,
  getLeaderboardByGame,
} from '../shared/registry/leaderboard';
import { GAMES_REGISTRY } from '../shared/registry/games';

describe('Official Leaderboard & Champion Registry', () => {
  it('should have a valid Top 10 leaderboard for all 5 registered games', () => {
    for (const game of GAMES_REGISTRY) {
      const data = getLeaderboardByGame(game.slug);
      expect(data).toBeDefined();
      if (!data) return;

      expect(data.gameId).toBe(game.slug);
      expect(data.teams).toHaveLength(10);
      expect(data.champion).toBeDefined();
      expect(data.champion.teamName.length).toBeGreaterThan(0);
      expect(data.champion.tournament.length).toBeGreaterThan(0);
      expect(data.source.length).toBeGreaterThan(0);
    }
  });

  it('should have sequentially ranked teams from 1 to 10 with valid points', () => {
    Object.values(LEADERBOARD_REGISTRY).forEach((board) => {
      board.teams.forEach((team, index) => {
        expect(team.rank).toBe(index + 1);
        expect(team.name.length).toBeGreaterThan(0);
        expect(team.points).toBeGreaterThan(0);
        expect(team.region.length).toBeGreaterThan(0);
        expect(['up', 'down', 'same']).toContain(team.change);
      });
    });
  });

  it('should fallback gracefully to cs2 for an unknown game slug', () => {
    const fallback = getLeaderboardByGame('non-existent-slug');
    expect(fallback).toBeDefined();
    expect(fallback?.gameId).toBe('cs2');
  });
});
