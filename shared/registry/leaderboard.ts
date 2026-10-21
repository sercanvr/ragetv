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
      logoUrl: '/teams/navi.png',
      badge: 'MAJOR CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'navi', name: 'Natus Vincere', acronym: 'NAVI', points: 1000, logoUrl: '/teams/navi.png', region: 'EU', change: 'same' },
      { rank: 2, id: 'vitality', name: 'Team Vitality', acronym: 'VIT', points: 920, logoUrl: '/teams/vitality.png', region: 'EU', change: 'up' },
      { rank: 3, id: 'g2', name: 'G2 Esports', acronym: 'G2', points: 880, logoUrl: '/teams/g2.png', region: 'EU', change: 'down' },
      { rank: 4, id: 'spirit', name: 'Team Spirit', acronym: 'TS', points: 840, logoUrl: '/teams/spirit.png', region: 'CIS', change: 'same' },
      { rank: 5, id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', points: 790, logoUrl: '/teams/faze.png', region: 'EU', change: 'down' },
      { rank: 6, id: 'mouz', name: 'MOUZ', acronym: 'MOUZ', points: 750, logoUrl: '/teams/mouz.png', region: 'EU', change: 'up' },
      { rank: 7, id: 'ef', name: 'Eternal Fire', acronym: 'EF', points: 680, logoUrl: '/teams/ef.png', region: 'TR', change: 'up' },
      { rank: 8, id: 'astralis', name: 'Astralis', acronym: 'AST', points: 640, logoUrl: '/teams/astralis.png', region: 'EU', change: 'same' },
      { rank: 9, id: 'liquid', name: 'Team Liquid', acronym: 'TL', points: 610, logoUrl: '/teams/liquid.png', region: 'NA', change: 'down' },
      { rank: 10, id: 'falcons', name: 'Team Falcons', acronym: 'FLC', points: 580, logoUrl: '/teams/falcons.png', region: 'MENA', change: 'up' },
    ],
  },
  valorant: {
    gameId: 'valorant',
    season: 'VCT 2025/2026 Tour',
    source: 'Riot Games Official VCT Circuit Standings',
    champion: {
      teamName: 'EDward Gaming',
      tournament: 'VALORANT Champions Seoul World Champions',
      logoUrl: '/teams/edg.png',
      badge: 'CHAMPIONS WINNER',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'edg', name: 'EDward Gaming', acronym: 'EDG', points: 1000, logoUrl: '/teams/edg.png', region: 'CN', change: 'same' },
      { rank: 2, id: 'heretics', name: 'Team Heretics', acronym: 'TH', points: 940, logoUrl: '/teams/heretics.png', region: 'EMEA', change: 'up' },
      { rank: 3, id: 'sen', name: 'Sentinels', acronym: 'SEN', points: 890, logoUrl: '/teams/sen.png', region: 'AMER', change: 'down' },
      { rank: 4, id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', points: 860, logoUrl: '/teams/geng.png', region: 'PAC', change: 'same' },
      { rank: 5, id: 'fnatic', name: 'Fnatic', acronym: 'FNC', points: 820, logoUrl: '/teams/fnatic.png', region: 'EMEA', change: 'up' },
      { rank: 6, id: 'loud', name: 'LOUD', acronym: 'LOUD', points: 780, logoUrl: '/teams/loud.png', region: 'AMER', change: 'down' },
      { rank: 7, id: 'vitality', name: 'Team Vitality', acronym: 'VIT', points: 730, logoUrl: '/teams/vitality.png', region: 'EMEA', change: 'up' },
      { rank: 8, id: 'prx', name: 'Paper Rex', acronym: 'PRX', points: 700, logoUrl: '/teams/prx.png', region: 'PAC', change: 'down' },
      { rank: 9, id: 'kc', name: 'Karmine Corp', acronym: 'KC', points: 660, logoUrl: '/teams/kc.png', region: 'EMEA', change: 'up' },
      { rank: 10, id: 'fut', name: 'FUT Esports', acronym: 'FUT', points: 610, logoUrl: '/teams/fut.png', region: 'EMEA', change: 'same' },
    ],
  },
  lol: {
    gameId: 'lol',
    season: '2025/2026 Season',
    source: 'Riot Games LoL Esports Global Power Rankings',
    champion: {
      teamName: 'T1',
      tournament: 'League of Legends Worlds 2024 Champions',
      logoUrl: '/teams/t1.png',
      badge: 'WORLDS CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 't1', name: 'T1', acronym: 'T1', points: 1000, logoUrl: '/teams/t1.png', region: 'LCK', change: 'same' },
      { rank: 2, id: 'blg', name: 'Bilibili Gaming', acronym: 'BLG', points: 950, logoUrl: '/teams/blg.png', region: 'LPL', change: 'up' },
      { rank: 3, id: 'geng', name: 'Gen.G', acronym: 'GEN', points: 910, logoUrl: '/teams/geng.png', region: 'LCK', change: 'down' },
      { rank: 4, id: 'g2', name: 'G2 Esports', acronym: 'G2', points: 840, logoUrl: '/teams/g2.png', region: 'LEC', change: 'up' },
      { rank: 5, id: 'fnatic', name: 'Fnatic', acronym: 'FNC', points: 790, logoUrl: '/teams/fnatic.png', region: 'LEC', change: 'same' },
      { rank: 6, id: 'liquid', name: 'Team Liquid', acronym: 'TL', points: 740, logoUrl: '/teams/liquid.png', region: 'LCS', change: 'up' },
      { rank: 7, id: 'edg', name: 'EDward Gaming', acronym: 'EDG', points: 700, logoUrl: '/teams/edg.png', region: 'LPL', change: 'down' },
      { rank: 8, id: 'fly', name: 'FlyQuest', acronym: 'FLY', points: 660, logoUrl: '/teams/fly.png', region: 'LCS', change: 'up' },
      { rank: 9, id: 'vitality', name: 'Team Vitality', acronym: 'VIT', points: 620, logoUrl: '/teams/vitality.png', region: 'LEC', change: 'same' },
      { rank: 10, id: 'kc', name: 'Karmine Corp', acronym: 'KC', points: 580, logoUrl: '/teams/kc.png', region: 'LEC', change: 'up' },
    ],
  },
  dota2: {
    gameId: 'dota2',
    season: '2025/2026 DPC Tour',
    source: 'Official Valve / ESL Pro Tour Rankings',
    champion: {
      teamName: 'Team Liquid',
      tournament: 'The International 2024 World Champions',
      logoUrl: '/teams/liquid.png',
      badge: 'TI CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'liquid', name: 'Team Liquid', acronym: 'TL', points: 1000, logoUrl: '/teams/liquid.png', region: 'WEU', change: 'same' },
      { rank: 2, id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', points: 930, logoUrl: '/teams/gg.png', region: 'WEU', change: 'up' },
      { rank: 3, id: 'falcons', name: 'Team Falcons', acronym: 'FLC', points: 890, logoUrl: '/teams/falcons.png', region: 'MENA', change: 'same' },
      { rank: 4, id: 'spirit', name: 'Team Spirit', acronym: 'TS', points: 830, logoUrl: '/teams/spirit.png', region: 'EEU', change: 'down' },
      { rank: 5, id: 'tundra', name: 'Tundra Esports', acronym: 'TUN', points: 780, logoUrl: '/teams/tundra.png', region: 'WEU', change: 'up' },
      { rank: 6, id: 'betboom', name: 'BetBoom Team', acronym: 'BB', points: 740, logoUrl: '/teams/betboom.png', region: 'EEU', change: 'down' },
      { rank: 7, id: 'xtreme', name: 'Xtreme Gaming', acronym: 'XG', points: 700, logoUrl: '/teams/xtreme.png', region: 'CN', change: 'same' },
      { rank: 8, id: 'parivision', name: 'PARIVISION', acronym: 'PARI', points: 660, logoUrl: '/teams/parivision.png', region: 'EEU', change: 'up' },
      { rank: 9, id: 'heroic', name: 'HEROIC Dota', acronym: 'HERO', points: 620, logoUrl: '/teams/heroic.png', region: 'SA', change: 'down' },
      { rank: 10, id: 'og', name: 'OG Esports', acronym: 'OG', points: 580, logoUrl: '/teams/og.png', region: 'WEU', change: 'up' },
    ],
  },
  pubg: {
    gameId: 'pubg',
    season: 'PUBG Global Series 2025/2026',
    source: 'Official KRAFTON PUBG Global Series Points',
    champion: {
      teamName: 'Twisted Minds',
      tournament: 'PGS 6 Grand Finals Champions',
      logoUrl: '/teams/twisted.png',
      badge: 'PGS CHAMPION',
      dates: '2024 - 2025',
    },
    teams: [
      { rank: 1, id: 'twisted', name: 'Twisted Minds', acronym: 'TW', points: 1000, logoUrl: '/teams/twisted.png', region: 'EMEA', change: 'same' },
      { rank: 2, id: 'soniqs', name: 'Soniqs', acronym: 'SQ', points: 920, logoUrl: '/teams/soniqs.png', region: 'AMER', change: 'up' },
      { rank: 3, id: '17', name: '17 Gaming', acronym: '17', points: 870, logoUrl: '/teams/17.png', region: 'APAC', change: 'down' },
      { rank: 4, id: 'danawa', name: 'Danawa e-sports', acronym: 'DNW', points: 830, logoUrl: '/teams/danawa.png', region: 'KR', change: 'same' },
      { rank: 5, id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', points: 790, logoUrl: '/teams/faze.png', region: 'EMEA', change: 'up' },
      { rank: 6, id: 'geng', name: 'Gen.G PUBG', acronym: 'GEN', points: 740, logoUrl: '/teams/geng.png', region: 'KR', change: 'down' },
      { rank: 7, id: 'cerberus', name: 'CERBERUS Esports', acronym: 'CES', points: 700, logoUrl: '/teams/cerberus.png', region: 'APAC', change: 'up' },
      { rank: 8, id: 'pero', name: 'Petrichor Road', acronym: 'PeRo', points: 660, logoUrl: '/teams/pero.png', region: 'CN', change: 'same' },
      { rank: 9, id: 'newhappy', name: 'NewHappy', acronym: 'NH', points: 610, logoUrl: '/teams/newhappy.png', region: 'CN', change: 'down' },
      { rank: 10, id: '4am', name: 'Four Angry Men', acronym: '4AM', points: 570, logoUrl: '/teams/4am.png', region: 'CN', change: 'up' },
    ],
  },
};

export function getLeaderboardByGame(gameSlug: string): GameLeaderboard | undefined {
  return LEADERBOARD_REGISTRY[gameSlug] || LEADERBOARD_REGISTRY['cs2'];
}
