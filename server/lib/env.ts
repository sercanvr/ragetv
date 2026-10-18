/**
 * Safe server-side environment variable access.
 * Strictly checks process.env or globalThis.env without exposing secrets to client.
 */

export interface ServerEnv {
  TWITCH_CLIENT_ID: string | null;
  TWITCH_CLIENT_SECRET: string | null;
  YOUTUBE_API_KEY: string | null;
  PANDASCORE_TOKEN: string | null;
}

export function getServerEnv(): ServerEnv {
  return {
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID || null,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET || null,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || null,
    PANDASCORE_TOKEN: process.env.PANDASCORE_TOKEN || null,
  };
}
