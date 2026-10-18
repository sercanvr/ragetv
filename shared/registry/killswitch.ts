/**
 * Killswitch registry for fast takedown of any channel, game, or platform.
 * Adding a channel login or game ID here instantly drops it from client & server.
 */
export const BLOCKED_CHANNELS: string[] = [];
export const BLOCKED_GAMES: string[] = [];
export const BLOCKED_PLATFORMS: string[] = [];

export function isChannelBlocked(login: string): boolean {
  return BLOCKED_CHANNELS.includes(login.toLowerCase());
}

export function isGameBlocked(gameId: string): boolean {
  return BLOCKED_GAMES.includes(gameId.toLowerCase());
}
