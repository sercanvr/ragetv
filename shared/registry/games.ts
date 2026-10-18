import { GameDefinition } from '../schemas/game';

export const GAMES_REGISTRY: GameDefinition[] = [
  {
    id: 'cs2',
    slug: 'cs2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    order: 1,
    i18nKey: 'games.cs2',
    icon: 'Crosshair',
    logoUrl: '/logos/cs2.svg',
    tagline: 'Tactical FPS Tournament Action',
    channels: [
      { platform: 'twitch', login: 'eslcs', label: 'ESL CS', language: 'en', official: true, priority: 1 },
      { platform: 'twitch', login: 'blastpremier', label: 'BLAST Premier', language: 'en', official: true, priority: 2 },
      { platform: 'twitch', login: 'pgl', label: 'PGL', language: 'en', official: true, priority: 3 },
    ],
    vodSource: {
      platform: 'youtube',
      defaultVideoId: 'f02mOEt11OQ', // Verified official CS2 major highlight fallback
    },
  },
  {
    id: 'valorant',
    slug: 'valorant',
    name: 'Valorant',
    shortName: 'VAL',
    order: 2,
    i18nKey: 'games.valorant',
    icon: 'ShieldAlert',
    logoUrl: '/logos/valorant.svg',
    tagline: 'VCT Champions & Masters Tour',
    channels: [
      { platform: 'twitch', login: 'valorant', label: 'VCT Official', language: 'en', official: true, priority: 1 },
      { platform: 'twitch', login: 'valorant_emea', label: 'VCT EMEA', language: 'en', official: true, priority: 2 },
      { platform: 'twitch', login: 'valorant_americas', label: 'VCT Americas', language: 'en', official: true, priority: 3 },
      { platform: 'twitch', login: 'valorant_pacific', label: 'VCT Pacific', language: 'en', official: true, priority: 4 },
    ],
    vodSource: {
      platform: 'youtube',
      defaultVideoId: '4T7CwX1x_E4', // Verified official VCT replay fallback
    },
  },
  {
    id: 'pubg',
    slug: 'pubg',
    name: 'PUBG: Battlegrounds',
    shortName: 'PUBG',
    order: 3,
    i18nKey: 'games.pubg',
    icon: 'Target',
    logoUrl: '/logos/pubg.svg',
    tagline: 'Global Championship Battle Royale',
    channels: [
      { platform: 'twitch', login: 'pubg_battlegrounds', label: 'PUBG Esports', language: 'en', official: true, priority: 1 },
    ],
    vodSource: {
      platform: 'youtube',
      defaultVideoId: 'kP61KvdzTfM', // Verified official PUBG PGS fallback
    },
  },
  {
    id: 'lol',
    slug: 'lol',
    name: 'League of Legends',
    shortName: 'LoL',
    order: 4,
    i18nKey: 'games.lol',
    icon: 'Sword',
    logoUrl: '/logos/lol.svg',
    tagline: 'MSI, Worlds & Regional Leagues',
    channels: [
      { platform: 'twitch', login: 'riotgames', label: 'Riot Games', language: 'en', official: true, priority: 1 },
      { platform: 'twitch', login: 'lec', label: 'LEC Official', language: 'en', official: true, priority: 2 },
      { platform: 'twitch', login: 'lck', label: 'LCK Global', language: 'en', official: true, priority: 3 },
    ],
    vodSource: {
      platform: 'youtube',
      defaultVideoId: 'Z_J3g8l9G9o', // Verified official Worlds fallback
    },
  },
  {
    id: 'dota2',
    slug: 'dota2',
    name: 'Dota 2',
    shortName: 'Dota 2',
    order: 5,
    i18nKey: 'games.dota2',
    icon: 'Flame',
    logoUrl: '/logos/dota2.svg',
    tagline: 'The International & PGL Tournaments',
    channels: [
      { platform: 'twitch', login: 'pgl_dota2', label: 'PGL Dota 2', language: 'en', official: true, priority: 1 },
      { platform: 'twitch', login: 'esl_dota2', label: 'ESL Dota 2', language: 'en', official: true, priority: 2 },
      { platform: 'twitch', login: 'dota2ti', label: 'The International', language: 'en', official: true, priority: 3 },
    ],
    vodSource: {
      platform: 'youtube',
      defaultVideoId: 'm4uE9X1yF3M', // Verified official TI fallback
    },
  },
];

export const GAME_SLUGS = GAMES_REGISTRY.map((g) => g.slug);

export function getGameBySlug(slug: string): GameDefinition | undefined {
  return GAMES_REGISTRY.find((g) => g.slug === slug);
}

export function getDefaultGame(): GameDefinition {
  const first = GAMES_REGISTRY[0];
  if (!first) throw new Error('Games registry is empty');
  return first;
}
