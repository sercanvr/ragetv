import { describe, it, expect } from 'vitest';
import { mapTwitchStreamToDomain, TwitchHelixStreamItem } from '../server/providers/twitch/mapper';
import { CircuitBreaker } from '../server/lib/circuitBreaker';

describe('Twitch Provider Mapper & Circuit Breaker', () => {
  it('should correctly map raw Twitch Helix item to domain Stream model', () => {
    const rawHelixItem: TwitchHelixStreamItem = {
      id: '12345678',
      user_id: '9876',
      user_login: 'ESLCS',
      user_name: 'ESL CS',
      game_id: '32399',
      game_name: 'Counter-Strike 2',
      type: 'live',
      title: 'ESL Pro League Season 21 - Grand Final',
      viewer_count: 54321,
      started_at: '2026-10-18T10:00:00Z',
      language: 'en',
      thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_eslcs-{width}x{height}.jpg',
    };

    const stream = mapTwitchStreamToDomain(rawHelixItem);

    expect(stream.id).toBe('twitch:eslcs');
    expect(stream.platform).toBe('twitch');
    expect(stream.channel).toBe('eslcs');
    expect(stream.title).toBe('ESL Pro League Season 21 - Grand Final');
    expect(stream.viewers).toBe(54321);
    expect(stream.thumbnailUrl).toBe(
      'https://static-cdn.jtvnw.net/previews-ttv/live_user_eslcs-640x360.jpg'
    );
    expect(stream.official).toBe(true);
  });

  it('should trip circuit breaker after threshold failures', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 2, cooldownPeriodMs: 5000 });
    expect(breaker.canExecute()).toBe(true);

    breaker.recordFailure();
    expect(breaker.canExecute()).toBe(true);

    breaker.recordFailure(); // Threshold met (2)
    expect(breaker.canExecute()).toBe(false);
    expect(breaker.getState().isOpen).toBe(true);

    breaker.recordSuccess();
    expect(breaker.canExecute()).toBe(true);
    expect(breaker.getState().isOpen).toBe(false);
  });
});
