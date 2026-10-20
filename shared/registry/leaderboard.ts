export interface LeaderboardTeam {
  rank: number;
  id: string;
  name: string;
  acronym: string;
  points: number;
  logoUrl: string;
  region: string;
  change?: 'up' | 'down' | 'same';
}

export interface GameLeaderboard {
  gameId: string;
  season: string;
  source: string;
  champion: {
    teamName: string;
    tournament: string;
    logoUrl: string;
    badge: string;
    dates: string;
  };
  teams: LeaderboardTeam[];
}

export const LEADERBOARD_REGISTRY: Record<string, GameLeaderboard> = {
  cs2: {
    gameId: 'cs2',
    season: '2025/2026 Season',
    source: 'Official Valve / HLTV World Rankings',
    champion: {
      teamName: 'Natus Vincere',
      tournament: 'PGL Major Copenhagen World Champions',
      logoUrl: '/teams/navi.svg',
      badge: 'MAJOR CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'navi', name: 'Natus Vincere', acronym: 'NAVI', points: 1000, logoUrl: '/teams/navi.svg', region: 'EU', change: 'same' },
      { rank: 2, id: 'vitality', name: 'Team Vitality', acronym: 'VIT', points: 920, logoUrl: '/teams/vitality.svg', region: 'EU', change: 'up' },
      { rank: 3, id: 'g2', name: 'G2 Esports', acronym: 'G2', points: 880, logoUrl: '/teams/g2.svg', region: 'EU', change: 'down' },
      { rank: 4, id: 'spirit', name: 'Team Spirit', acronym: 'TS', points: 840, logoUrl: '/teams/spirit.svg', region: 'CIS', change: 'same' },
      { rank: 5, id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', points: 790, logoUrl: '/teams/faze.svg', region: 'EU', change: 'down' },
      { rank: 6, id: 'mouz', name: 'MOUZ', acronym: 'MOUZ', points: 750, logoUrl: '/teams/mouz.svg', region: 'EU', change: 'up' },
      { rank: 7, id: 'fut', name: 'Eternal Fire', acronym: 'EF', points: 680, logoUrl: '/teams/fut.svg', region: 'TR', change: 'up' },
      { rank: 8, id: 'astralis', name: 'Astralis', acronym: 'AST', points: 640, logoUrl: '/teams/astralis.svg', region: 'EU', change: 'same' },
      { rank: 9, id: 'liquid', name: 'Team Liquid', acronym: 'TL', points: 610, logoUrl: '/teams/liquid.svg', region: 'NA', change: 'down' },
      { rank: 10, id: 'falcons', name: 'Team Falcons', acronym: 'FLC', points: 580, logoUrl: '/teams/falcons.svg', region: 'MENA', change: 'up' },
    ],
  },
  valorant: {
    gameId: 'valorant',
    season: 'VCT 2025/2026 Tour',
    source: 'Riot Games Official VCT Circuit Standings',
    champion: {
      teamName: 'EDward Gaming',
      tournament: 'VALORANT Champions Seoul World Champions',
      logoUrl: '/teams/edg.svg',
      badge: 'CHAMPIONS WINNER',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'edg', name: 'EDward Gaming', acronym: 'EDG', points: 1000, logoUrl: '/teams/edg.svg', region: 'CN', change: 'same' },
      { rank: 2, id: 'heretics', name: 'Team Heretics', acronym: 'TH', points: 940, logoUrl: '/teams/heretics.svg', region: 'EMEA', change: 'up' },
      { rank: 3, id: 'sen', name: 'Sentinels', acronym: 'SEN', points: 890, logoUrl: '/teams/sen.svg', region: 'AMER', change: 'down' },
      { rank: 4, id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', points: 860, logoUrl: '/teams/geng.svg', region: 'PAC', change: 'same' },
      { rank: 5, id: 'fnatic', name: 'Fnatic', acronym: 'FNC', points: 820, logoUrl: '/teams/fnatic.svg', region: 'EMEA', change: 'up' },
      { rank: 6, id: 'loud', name: 'LOUD', acronym: 'LOUD', points: 780, logoUrl: '/teams/loud.svg', region: 'AMER', change: 'down' },
      { rank: 7, id: 'vitality', name: 'Team Vitality', acronym: 'VIT', points: 730, logoUrl: '/teams/vitality.svg', region: 'EMEA', change: 'up' },
      { rank: 8, id: 'prx', name: 'Paper Rex', acronym: 'PRX', points: 700, logoUrl: '/teams/prx.svg', region: 'PAC', change: 'down' },
      { rank: 9, id: 'kc', name: 'Karmine Corp', acronym: 'KC', points: 660, logoUrl: '/teams/kc.svg', region: 'EMEA', change: 'up' },
      { rank: 10, id: 'fut', name: 'FUT Esports', acronym: 'FUT', points: 610, logoUrl: '/teams/fut.svg', region: 'EMEA', change: 'same' },
    ],
  },
  lol: {
    gameId: 'lol',
    season: '2025/2026 Season',
    source: 'Riot Games LoL Esports Global Power Rankings',
    champion: {
      teamName: 'T1',
      tournament: 'League of Legends Worlds 2024 Champions',
      logoUrl: '/teams/t1.svg',
      badge: 'WORLDS CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 't1', name: 'T1', acronym: 'T1', points: 1000, logoUrl: '/teams/t1.svg', region: 'LCK', change: 'same' },
      { rank: 2, id: 'blg', name: 'Bilibili Gaming', acronym: 'BLG', points: 950, logoUrl: '/teams/blg.svg', region: 'LPL', change: 'up' },
      { rank: 3, id: 'geng', name: 'Gen.G', acronym: 'GEN', points: 910, logoUrl: '/teams/geng.svg', region: 'LCK', change: 'down' },
      { rank: 4, id: 'g2', name: 'G2 Esports', acronym: 'G2', points: 840, logoUrl: '/teams/g2.svg', region: 'LEC', change: 'up' },
      { rank: 5, id: 'fnatic', name: 'Fnatic', acronym: 'FNC', points: 790, logoUrl: '/teams/fnatic.svg', region: 'LEC', change: 'same' },
      { rank: 6, id: 'liquid', name: 'Team Liquid', acronym: 'TL', points: 740, logoUrl: '/teams/liquid.svg', region: 'LCS', change: 'up' },
      { rank: 7, id: 'edg', name: 'EDward Gaming', acronym: 'EDG', points: 700, logoUrl: '/teams/edg.svg', region: 'LPL', change: 'down' },
      { rank: 8, id: 'sen', name: 'FlyQuest', acronym: 'FLY', points: 660, logoUrl: '/teams/sen.svg', region: 'LCS', change: 'up' },
      { rank: 9, id: 'vitality', name: 'Team Vitality', acronym: 'VIT', points: 620, logoUrl: '/teams/vitality.svg', region: 'LEC', change: 'same' },
      { rank: 10, id: 'kc', name: 'Karmine Corp', acronym: 'KC', points: 580, logoUrl: '/teams/kc.svg', region: 'LEC', change: 'up' },
    ],
  },
  dota2: {
    gameId: 'dota2',
    season: '2025/2026 DPC Tour',
    source: 'Official Valve / ESL Pro Tour Rankings',
    champion: {
      teamName: 'Team Liquid',
      tournament: 'The International 2024 World Champions',
      logoUrl: '/teams/liquid.svg',
      badge: 'TI CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'liquid', name: 'Team Liquid', acronym: 'TL', points: 1000, logoUrl: '/teams/liquid.svg', region: 'WEU', change: 'same' },
      { rank: 2, id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', points: 930, logoUrl: '/teams/gg.svg', region: 'WEU', change: 'up' },
      { rank: 3, id: 'falcons', name: 'Team Falcons', acronym: 'FLC', points: 890, logoUrl: '/teams/falcons.svg', region: 'MENA', change: 'same' },
      { rank: 4, id: 'spirit', name: 'Team Spirit', acronym: 'TS', points: 830, logoUrl: '/teams/spirit.svg', region: 'EEU', change: 'down' },
      { rank: 5, id: 'g2', name: 'Tundra Esports', acronym: 'TUN', points: 780, logoUrl: '/teams/g2.svg', region: 'WEU', change: 'up' },
      { rank: 6, id: 'fnatic', name: 'BetBoom Team', acronym: 'BB', points: 740, logoUrl: '/teams/fnatic.svg', region: 'EEU', change: 'down' },
      { rank: 7, id: 'blg', name: 'Xtreme Gaming', acronym: 'XG', points: 700, logoUrl: '/teams/blg.svg', region: 'CN', change: 'same' },
      { rank: 8, id: 'astralis', name: 'PARIVISION', acronym: 'PARI', points: 660, logoUrl: '/teams/astralis.svg', region: 'EEU', change: 'up' },
      { rank: 9, id: 'fut', name: 'HEROIC Dota', acronym: 'HERO', points: 620, logoUrl: '/teams/fut.svg', region: 'SA', change: 'down' },
      { rank: 10, id: 't1', name: 'OG Esports', acronym: 'OG', points: 580, logoUrl: '/teams/t1.svg', region: 'WEU', change: 'up' },
    ],
  },
  pubg: {
    gameId: 'pubg',
    season: 'PUBG Global Series 2025/2026',
    source: 'Official KRAFTON PUBG Global Series Points',
    champion: {
      teamName: 'Twisted Minds',
      tournament: 'PGS 6 Grand Finals Champions',
      logoUrl: '/teams/twisted.svg',
      badge: 'PGS CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'twisted', name: 'Twisted Minds', acronym: 'TW', points: 1000, logoUrl: '/teams/twisted.svg', region: 'EMEA', change: 'same' },
      { rank: 2, id: 'soniqs', name: 'Soniqs', acronym: 'SQ', points: 920, logoUrl: '/teams/soniqs.svg', region: 'AMER', change: 'up' },
      { rank: 3, id: '17', name: '17 Gaming', acronym: '17', points: 870, logoUrl: '/teams/17.svg', region: 'APAC', change: 'down' },
      { rank: 4, id: 'danawa', name: 'Danawa e-sports', acronym: 'DNW', points: 830, logoUrl: '/teams/danawa.svg', region: 'KR', change: 'same' },
      { rank: 5, id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', points: 790, logoUrl: '/teams/faze.svg', region: 'EMEA', change: 'up' },
      { rank: 6, id: 'geng', name: 'Gen.G PUBG', acronym: 'GEN', points: 740, logoUrl: '/teams/geng.svg', region: 'KR', change: 'down' },
      { rank: 7, id: 'falcons', name: 'CERBERUS Esports', acronym: 'CES', points: 700, logoUrl: '/teams/falcons.svg', region: 'APAC', change: 'up' },
      { rank: 8, id: 'fut', name: 'Petrichor Road', acronym: 'PeRo', points: 660, logoUrl: '/teams/fut.svg', region: 'CN', change: 'same' },
      { rank: 9, id: 'blg', name: 'NewHappy', acronym: 'NH', points: 610, logoUrl: '/teams/blg.svg', region: 'CN', change: 'down' },
      { rank: 10, id: 'navi', name: 'Four Angry Men', acronym: '4AM', points: 570, logoUrl: '/teams/navi.svg', region: 'CN', change: 'up' },
    ],
  },
};

export function getLeaderboardByGame(gameSlug: string): GameLeaderboard | undefined {
  return LEADERBOARD_REGISTRY[gameSlug] || LEADERBOARD_REGISTRY['cs2'];
}
