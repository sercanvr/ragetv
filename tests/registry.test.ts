import { describe, it, expect } from 'vitest';
import { GAMES_REGISTRY, getGameBySlug } from '../shared/registry/games';
import { isChannelBlocked, isGameBlocked, BLOCKED_CHANNELS, BLOCKED_GAMES } from '../shared/registry/killswitch';
import { getVerifiedFallbackFixtures } from '../shared/registry/fixtures';

describe('Games & Killswitch Registry Integrity', () => {
  it('should register exactly 5 games with unique IDs and slugs', () => {
    expect(GAMES_REGISTRY).toHaveLength(5);

    const ids = GAMES_REGISTRY.map((g) => g.id);
    const slugs = GAMES_REGISTRY.map((g) => g.slug);
    const orders = GAMES_REGISTRY.map((g) => g.order);

    expect(new Set(ids).size).toBe(5);
    expect(new Set(slugs).size).toBe(5);
    expect(new Set(orders).size).toBe(5);
  });

  it('should find each game by its slug', () => {
    for (const game of GAMES_REGISTRY) {
      const found = getGameBySlug(game.slug);
      expect(found).toBeDefined();
      expect(found?.id).toBe(game.id);
      expect(found?.channels.length).toBeGreaterThan(0);
      expect(found?.vodSource.defaultVideoId.length).toBeGreaterThan(0);
    }
  });

  it('should return undefined for invalid game slug', () => {
    expect(getGameBySlug('unknown-game')).toBeUndefined();
  });

  it('should have valid channel priorities and platforms', () => {
    for (const game of GAMES_REGISTRY) {
      game.channels.forEach((ch) => {
        expect(['twitch', 'youtube']).toContain(ch.platform);
        expect(ch.login.trim().length).toBeGreaterThan(0);
        expect(ch.priority).toBeGreaterThan(0);
      });
    }
  });

  it('should respect killswitch functions', () => {
    expect(isChannelBlocked('safe_channel')).toBe(false);
    expect(isGameBlocked('cs2')).toBe(false);

    // Test temporary push
    BLOCKED_CHANNELS.push('test_banned_channel');
    BLOCKED_GAMES.push('test_banned_game');

    expect(isChannelBlocked('TEST_BANNED_CHANNEL')).toBe(true);
    expect(isGameBlocked('TEST_BANNED_GAME')).toBe(true);

    // Cleanup
    BLOCKED_CHANNELS.pop();
    BLOCKED_GAMES.pop();
  });

  it('should return valid fallback fixtures for every supported game', () => {
    for (const game of GAMES_REGISTRY) {
      const fixtures = getVerifiedFallbackFixtures(game.slug);
      expect(fixtures.upcoming.length).toBeGreaterThan(0);
      expect(fixtures.results.length).toBeGreaterThan(0);
      fixtures.upcoming.forEach((match) => {
        expect(match.teamA.name.length).toBeGreaterThan(0);
        expect(match.teamB.name.length).toBeGreaterThan(0);
      });
    }
  });
});
