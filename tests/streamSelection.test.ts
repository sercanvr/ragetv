import { describe, it, expect } from 'vitest';
import { selectPrimaryStream } from '../shared/streamSelection';
import { Stream } from '../shared/schemas/stream';

describe('Domain: selectPrimaryStream Hierarchy', () => {
  const streamEnOfficial: Stream = {
    id: 'twitch:eslcs',
    platform: 'twitch',
    channel: 'eslcs',
    title: 'ESL Pro League - English Main',
    viewers: 25000,
    language: 'en',
    official: true,
  };

  const streamTrOfficial: Stream = {
    id: 'twitch:esl_csgo_tr',
    platform: 'twitch',
    channel: 'esl_csgo_tr',
    title: 'ESL Pro League - Türkçe Resmi',
    viewers: 12000,
    language: 'tr',
    official: true,
  };

  const streamEnCommunity: Stream = {
    id: 'twitch:co_streamer',
    platform: 'twitch',
    channel: 'co_streamer',
    title: 'Watch Party High Viewers',
    viewers: 50000,
    language: 'en',
    official: false,
  };

  it('should return null for empty or undefined stream list', () => {
    expect(selectPrimaryStream([])).toBeNull();
    expect(selectPrimaryStream([] as Stream[], { preferredLanguage: 'en' })).toBeNull();
  });

  it('should return single stream when only one is available', () => {
    expect(selectPrimaryStream([streamEnCommunity])).toEqual(streamEnCommunity);
  });

  it('should prioritize official streams over non-official streams regardless of viewers', () => {
    // Community has 50k, official has 25k -> official must win
    const selected = selectPrimaryStream([streamEnCommunity, streamEnOfficial]);
    expect(selected?.id).toBe(streamEnOfficial.id);
  });

  it('should boost preferred language when specified', () => {
    // Both are official, English has 25k, Turkish has 12k. If user prefers 'tr', Turkish should win
    const selected = selectPrimaryStream([streamEnOfficial, streamTrOfficial], {
      preferredLanguage: 'tr',
    });
    expect(selected?.id).toBe(streamTrOfficial.id);
  });

  it('should fallback to highest viewers among official streams when language has no exact match', () => {
    // Preferred 'de' has no match -> should pick English (25k) over Turkish (12k)
    const selected = selectPrimaryStream([streamTrOfficial, streamEnOfficial], {
      preferredLanguage: 'de',
    });
    expect(selected?.id).toBe(streamEnOfficial.id);
  });

  it('should pick higher viewers when both are non-official and same language', () => {
    const smallerCommunity: Stream = {
      ...streamEnCommunity,
      id: 'twitch:small_co',
      viewers: 5000,
    };
    const selected = selectPrimaryStream([smallerCommunity, streamEnCommunity]);
    expect(selected?.id).toBe(streamEnCommunity.id);
  });
});
