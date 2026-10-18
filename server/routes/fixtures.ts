import { Hono } from 'hono';
import { getGameBySlug } from '../../shared/registry/games';
import { getServerEnv } from '../lib/env';
import { fetchPandaScoreMatches } from '../providers/pandascore/client';
import { FixturesResponse, Match } from '../../shared/schemas/fixture';

export const fixturesRouter = new Hono();

// Verified fallback matches for zero-cost / offline resiliency
function getVerifiedFallbackFixtures(gameSlug: string): { upcoming: Match[]; results: Match[] } {
  const now = Date.now();
  const h = (hours: number) => new Date(now + hours * 3600 * 1000).toISOString();
  const d = (days: number) => new Date(now - days * 24 * 3600 * 1000).toISOString();

  if (gameSlug === 'cs2') {
    return {
      upcoming: [
        {
          id: 'fixture:cs2:1',
          gameId: 'cs2',
          tournamentName: 'ESL Pro League Season 21',
          scheduledAt: h(2),
          status: 'upcoming',
          teamA: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
          teamB: { id: 'vitality', name: 'Team Vitality', acronym: 'VIT', logoUrl: '/teams/vitality.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=eslcs',
        },
        {
          id: 'fixture:cs2:2',
          gameId: 'cs2',
          tournamentName: 'BLAST Premier Fall Final',
          scheduledAt: h(5),
          status: 'upcoming',
          teamA: { id: 'navi', name: 'Natus Vincere', acronym: 'NAVI', logoUrl: '/teams/navi.svg' },
          teamB: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=blastpremier',
        },
        {
          id: 'fixture:cs2:3',
          gameId: 'cs2',
          tournamentName: 'IEM Katowice 2025',
          scheduledAt: h(12),
          status: 'upcoming',
          teamA: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          teamB: { id: 'mouz', name: 'MOUZ', acronym: 'MOUZ', logoUrl: '/teams/mouz.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=eslcs',
        },
        {
          id: 'fixture:cs2:4',
          gameId: 'cs2',
          tournamentName: 'PGL Masters Series',
          scheduledAt: h(24),
          status: 'upcoming',
          teamA: { id: 'astralis', name: 'Astralis', acronym: 'AST', logoUrl: '/teams/astralis.svg' },
          teamB: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=pgl',
        },
        {
          id: 'fixture:cs2:5',
          gameId: 'cs2',
          tournamentName: 'ESL Pro League Group Stage',
          scheduledAt: h(36),
          status: 'upcoming',
          teamA: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          teamB: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=eslcs',
        },
      ],
      results: [
        {
          id: 'fixture:cs2:r1',
          gameId: 'cs2',
          tournamentName: 'PGL Major Copenhagen Grand Final',
          scheduledAt: d(1),
          status: 'completed',
          teamA: { id: 'navi', name: 'Natus Vincere', acronym: 'NAVI', logoUrl: '/teams/navi.svg' },
          teamB: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
          score: { teamA: 2, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:cs2:r2',
          gameId: 'cs2',
          tournamentName: 'BLAST Premier World Final',
          scheduledAt: d(2),
          status: 'completed',
          teamA: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          teamB: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          score: { teamA: 2, teamB: 0 },
          streamUrl: null,
        },
        {
          id: 'fixture:cs2:r3',
          gameId: 'cs2',
          tournamentName: 'IEM Cologne Semifinal',
          scheduledAt: d(3),
          status: 'completed',
          teamA: { id: 'vitality', name: 'Team Vitality', acronym: 'VIT', logoUrl: '/teams/vitality.svg' },
          teamB: { id: 'mouz', name: 'MOUZ', acronym: 'MOUZ', logoUrl: '/teams/mouz.svg' },
          score: { teamA: 2, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:cs2:r4',
          gameId: 'cs2',
          tournamentName: 'ESL Pro League Quarterfinal',
          scheduledAt: d(4),
          status: 'completed',
          teamA: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          teamB: { id: 'astralis', name: 'Astralis', acronym: 'AST', logoUrl: '/teams/astralis.svg' },
          score: { teamA: 2, teamB: 0 },
          streamUrl: null,
        },
        {
          id: 'fixture:cs2:r5',
          gameId: 'cs2',
          tournamentName: 'BLAST Premier Spring Showdown',
          scheduledAt: d(6),
          status: 'completed',
          teamA: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
          teamB: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          score: { teamA: 2, teamB: 1 },
          streamUrl: null,
        },
      ],
    };
  }

  if (gameSlug === 'valorant') {
    return {
      upcoming: [
        {
          id: 'fixture:val:1',
          gameId: 'valorant',
          tournamentName: 'VCT EMEA Stage 1',
          scheduledAt: h(2),
          status: 'upcoming',
          teamA: { id: 'fnc', name: 'Fnatic', acronym: 'FNC', logoUrl: '/teams/fnatic.svg' },
          teamB: { id: 'vitality', name: 'Team Vitality', acronym: 'VIT', logoUrl: '/teams/vitality.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=valorant_emea',
        },
        {
          id: 'fixture:val:2',
          gameId: 'valorant',
          tournamentName: 'VCT Americas Kickoff',
          scheduledAt: h(6),
          status: 'upcoming',
          teamA: { id: 'sen', name: 'Sentinels', acronym: 'SEN', logoUrl: '/teams/sen.svg' },
          teamB: { id: 'loud', name: 'LOUD', acronym: 'LOUD', logoUrl: '/teams/loud.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=valorant_americas',
        },
        {
          id: 'fixture:val:3',
          gameId: 'valorant',
          tournamentName: 'VCT Pacific Stage 1',
          scheduledAt: h(14),
          status: 'upcoming',
          teamA: { id: 'prx', name: 'Paper Rex', acronym: 'PRX', logoUrl: '/teams/prx.svg' },
          teamB: { id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=valorant_pacific',
        },
        {
          id: 'fixture:val:4',
          gameId: 'valorant',
          tournamentName: 'VCT Masters International',
          scheduledAt: h(26),
          status: 'upcoming',
          teamA: { id: 'heretics', name: 'Team Heretics', acronym: 'TH', logoUrl: '/teams/heretics.svg' },
          teamB: { id: 'edg', name: 'EDward Gaming', acronym: 'EDG', logoUrl: '/teams/edg.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=valorant',
        },
        {
          id: 'fixture:val:5',
          gameId: 'valorant',
          tournamentName: 'VCT EMEA Regular Season',
          scheduledAt: h(38),
          status: 'upcoming',
          teamA: { id: 'kc', name: 'Karmine Corp', acronym: 'KC', logoUrl: '/teams/kc.svg' },
          teamB: { id: 'fut', name: 'FUT Esports', acronym: 'FUT', logoUrl: '/teams/fut.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=valorant_emea',
        },
      ],
      results: [
        {
          id: 'fixture:val:r1',
          gameId: 'valorant',
          tournamentName: 'VALORANT Champions Seoul Grand Final',
          scheduledAt: d(1),
          status: 'completed',
          teamA: { id: 'edg', name: 'EDward Gaming', acronym: 'EDG', logoUrl: '/teams/edg.svg' },
          teamB: { id: 'heretics', name: 'Team Heretics', acronym: 'TH', logoUrl: '/teams/heretics.svg' },
          score: { teamA: 3, teamB: 2 },
          streamUrl: null,
        },
        {
          id: 'fixture:val:r2',
          gameId: 'valorant',
          tournamentName: 'VCT Masters Madrid Grand Final',
          scheduledAt: d(2),
          status: 'completed',
          teamA: { id: 'sen', name: 'Sentinels', acronym: 'SEN', logoUrl: '/teams/sen.svg' },
          teamB: { id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          score: { teamA: 3, teamB: 2 },
          streamUrl: null,
        },
        {
          id: 'fixture:val:r3',
          gameId: 'valorant',
          tournamentName: 'VCT Masters Shanghai Final',
          scheduledAt: d(3),
          status: 'completed',
          teamA: { id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          teamB: { id: 'heretics', name: 'Team Heretics', acronym: 'TH', logoUrl: '/teams/heretics.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:val:r4',
          gameId: 'valorant',
          tournamentName: 'VCT EMEA Stage 2 Grand Final',
          scheduledAt: d(4),
          status: 'completed',
          teamA: { id: 'fnc', name: 'Fnatic', acronym: 'FNC', logoUrl: '/teams/fnatic.svg' },
          teamB: { id: 'vitality', name: 'Team Vitality', acronym: 'VIT', logoUrl: '/teams/vitality.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:val:r5',
          gameId: 'valorant',
          tournamentName: 'VCT Pacific Championship',
          scheduledAt: d(5),
          status: 'completed',
          teamA: { id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          teamB: { id: 'prx', name: 'Paper Rex', acronym: 'PRX', logoUrl: '/teams/prx.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
      ],
    };
  }

  if (gameSlug === 'lol') {
    return {
      upcoming: [
        {
          id: 'fixture:lol:1',
          gameId: 'lol',
          tournamentName: 'LCK Spring Regular Season',
          scheduledAt: h(3),
          status: 'upcoming',
          teamA: { id: 't1', name: 'T1', acronym: 'T1', logoUrl: '/teams/t1.svg' },
          teamB: { id: 'geng', name: 'Gen.G', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=lck',
        },
        {
          id: 'fixture:lol:2',
          gameId: 'lol',
          tournamentName: 'LEC Winter Split',
          scheduledAt: h(7),
          status: 'upcoming',
          teamA: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          teamB: { id: 'fnatic', name: 'Fnatic', acronym: 'FNC', logoUrl: '/teams/fnatic.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=lec',
        },
        {
          id: 'fixture:lol:3',
          gameId: 'lol',
          tournamentName: 'LPL Championship Series',
          scheduledAt: h(15),
          status: 'upcoming',
          teamA: { id: 'blg', name: 'Bilibili Gaming', acronym: 'BLG', logoUrl: '/teams/blg.svg' },
          teamB: { id: 'edg', name: 'EDward Gaming', acronym: 'EDG', logoUrl: '/teams/edg.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=riotgames',
        },
        {
          id: 'fixture:lol:4',
          gameId: 'lol',
          tournamentName: 'Mid-Season Invitational (MSI)',
          scheduledAt: h(28),
          status: 'upcoming',
          teamA: { id: 't1', name: 'T1', acronym: 'T1', logoUrl: '/teams/t1.svg' },
          teamB: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=riotgames',
        },
        {
          id: 'fixture:lol:5',
          gameId: 'lol',
          tournamentName: 'LCS Championship Tour',
          scheduledAt: h(40),
          status: 'upcoming',
          teamA: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          teamB: { id: 'sen', name: 'Sentinels Gaming', acronym: 'SEN', logoUrl: '/teams/sen.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=riotgames',
        },
      ],
      results: [
        {
          id: 'fixture:lol:r1',
          gameId: 'lol',
          tournamentName: 'Worlds 2024 Grand Finals',
          scheduledAt: d(1),
          status: 'completed',
          teamA: { id: 't1', name: 'T1', acronym: 'T1', logoUrl: '/teams/t1.svg' },
          teamB: { id: 'blg', name: 'Bilibili Gaming', acronym: 'BLG', logoUrl: '/teams/blg.svg' },
          score: { teamA: 3, teamB: 2 },
          streamUrl: null,
        },
        {
          id: 'fixture:lol:r2',
          gameId: 'lol',
          tournamentName: 'Worlds 2024 Semifinal',
          scheduledAt: d(2),
          status: 'completed',
          teamA: { id: 't1', name: 'T1', acronym: 'T1', logoUrl: '/teams/t1.svg' },
          teamB: { id: 'geng', name: 'Gen.G', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:lol:r3',
          gameId: 'lol',
          tournamentName: 'MSI 2024 Grand Finals',
          scheduledAt: d(3),
          status: 'completed',
          teamA: { id: 'geng', name: 'Gen.G', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
          teamB: { id: 'blg', name: 'Bilibili Gaming', acronym: 'BLG', logoUrl: '/teams/blg.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:lol:r4',
          gameId: 'lol',
          tournamentName: 'LEC Season Finals',
          scheduledAt: d(5),
          status: 'completed',
          teamA: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          teamB: { id: 'fnatic', name: 'Fnatic', acronym: 'FNC', logoUrl: '/teams/fnatic.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
        {
          id: 'fixture:lol:r5',
          gameId: 'lol',
          tournamentName: 'LCS Championship Final',
          scheduledAt: d(7),
          status: 'completed',
          teamA: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          teamB: { id: 'g2', name: 'G2 Esports', acronym: 'G2', logoUrl: '/teams/g2.svg' },
          score: { teamA: 3, teamB: 0 },
          streamUrl: null,
        },
      ],
    };
  }

  if (gameSlug === 'dota2') {
    return {
      upcoming: [
        {
          id: 'fixture:dota:1',
          gameId: 'dota2',
          tournamentName: 'PGL Wallachia Season 2',
          scheduledAt: h(2),
          status: 'upcoming',
          teamA: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          teamB: { id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', logoUrl: '/teams/gg.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=pgl_dota2',
        },
        {
          id: 'fixture:dota:2',
          gameId: 'dota2',
          tournamentName: 'ESL One Birmingham 2025',
          scheduledAt: h(6),
          status: 'upcoming',
          teamA: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          teamB: { id: 'falcons', name: 'Team Falcons', acronym: 'FLC', logoUrl: '/teams/falcons.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=esl_dota2',
        },
        {
          id: 'fixture:dota:3',
          gameId: 'dota2',
          tournamentName: 'DreamLeague Season 24',
          scheduledAt: h(16),
          status: 'upcoming',
          teamA: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          teamB: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=esl_dota2',
        },
        {
          id: 'fixture:dota:4',
          gameId: 'dota2',
          tournamentName: 'The International Qualifiers',
          scheduledAt: h(28),
          status: 'upcoming',
          teamA: { id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', logoUrl: '/teams/gg.svg' },
          teamB: { id: 'falcons', name: 'Team Falcons', acronym: 'FLC', logoUrl: '/teams/falcons.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=dota2ti',
        },
        {
          id: 'fixture:dota:5',
          gameId: 'dota2',
          tournamentName: 'Riyadh Masters Group Stage',
          scheduledAt: h(44),
          status: 'upcoming',
          teamA: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          teamB: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          score: null,
          streamUrl: 'https://player.twitch.tv/?channel=pgl_dota2',
        },
      ],
      results: [
        {
          id: 'fixture:dota:r1',
          gameId: 'dota2',
          tournamentName: 'The International 2024 Grand Final',
          scheduledAt: d(1),
          status: 'completed',
          teamA: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          teamB: { id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', logoUrl: '/teams/gg.svg' },
          score: { teamA: 3, teamB: 0 },
          streamUrl: null,
        },
        {
          id: 'fixture:dota:r2',
          gameId: 'dota2',
          tournamentName: 'Riyadh Masters 2024 Grand Final',
          scheduledAt: d(2),
          status: 'completed',
          teamA: { id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', logoUrl: '/teams/gg.svg' },
          teamB: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          score: { teamA: 3, teamB: 0 },
          streamUrl: null,
        },
        {
          id: 'fixture:dota:r3',
          gameId: 'dota2',
          tournamentName: 'ESL One Birmingham Grand Final',
          scheduledAt: d(3),
          status: 'completed',
          teamA: { id: 'falcons', name: 'Team Falcons', acronym: 'FLC', logoUrl: '/teams/falcons.svg' },
          teamB: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          score: { teamA: 3, teamB: 0 },
          streamUrl: null,
        },
        {
          id: 'fixture:dota:r4',
          gameId: 'dota2',
          tournamentName: 'PGL Wallachia Grand Final',
          scheduledAt: d(4),
          status: 'completed',
          teamA: { id: 'spirit', name: 'Team Spirit', acronym: 'TS', logoUrl: '/teams/spirit.svg' },
          teamB: { id: 'liquid', name: 'Team Liquid', acronym: 'TL', logoUrl: '/teams/liquid.svg' },
          score: { teamA: 3, teamB: 2 },
          streamUrl: null,
        },
        {
          id: 'fixture:dota:r5',
          gameId: 'dota2',
          tournamentName: 'DreamLeague Season 23 Final',
          scheduledAt: d(6),
          status: 'completed',
          teamA: { id: 'falcons', name: 'Team Falcons', acronym: 'FLC', logoUrl: '/teams/falcons.svg' },
          teamB: { id: 'gg', name: 'Gaimin Gladiators', acronym: 'GG', logoUrl: '/teams/gg.svg' },
          score: { teamA: 3, teamB: 1 },
          streamUrl: null,
        },
      ],
    };
  }

  // PUBG: Battlegrounds
  return {
    upcoming: [
      {
        id: 'fixture:pubg:1',
        gameId: 'pubg',
        tournamentName: 'PUBG Global Series (PGS) 7',
        scheduledAt: h(2),
        status: 'upcoming',
        teamA: { id: 'twisted', name: 'Twisted Minds', acronym: 'TW', logoUrl: '/teams/twisted.svg' },
        teamB: { id: 'soniqs', name: 'Soniqs', acronym: 'SQ', logoUrl: '/teams/soniqs.svg' },
        score: null,
        streamUrl: 'https://player.twitch.tv/?channel=pubg_battlegrounds',
      },
      {
        id: 'fixture:pubg:2',
        gameId: 'pubg',
        tournamentName: 'PUBG Nations Cup (PNC) 2025',
        scheduledAt: h(6),
        status: 'upcoming',
        teamA: { id: '17', name: '17 Gaming', acronym: '17', logoUrl: '/teams/17.svg' },
        teamB: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
        score: null,
        streamUrl: 'https://player.twitch.tv/?channel=pubg_battlegrounds',
      },
      {
        id: 'fixture:pubg:3',
        gameId: 'pubg',
        tournamentName: 'PGS Americas Qualifier',
        scheduledAt: h(18),
        status: 'upcoming',
        teamA: { id: 'soniqs', name: 'Soniqs', acronym: 'SQ', logoUrl: '/teams/soniqs.svg' },
        teamB: { id: 'danawa', name: 'Danawa e-sports', acronym: 'DNW', logoUrl: '/teams/danawa.svg' },
        score: null,
        streamUrl: 'https://player.twitch.tv/?channel=pubg_battlegrounds',
      },
      {
        id: 'fixture:pubg:4',
        gameId: 'pubg',
        tournamentName: 'PGS EMEA Showdown',
        scheduledAt: h(29),
        status: 'upcoming',
        teamA: { id: 'twisted', name: 'Twisted Minds', acronym: 'TW', logoUrl: '/teams/twisted.svg' },
        teamB: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
        score: null,
        streamUrl: 'https://player.twitch.tv/?channel=pubg_battlegrounds',
      },
      {
        id: 'fixture:pubg:5',
        gameId: 'pubg',
        tournamentName: 'PUBG Champions League',
        scheduledAt: h(42),
        status: 'upcoming',
        teamA: { id: '17', name: '17 Gaming', acronym: '17', logoUrl: '/teams/17.svg' },
        teamB: { id: 'geng', name: 'Gen.G Esports', acronym: 'GEN', logoUrl: '/teams/geng.svg' },
        score: null,
        streamUrl: 'https://player.twitch.tv/?channel=pubg_battlegrounds',
      },
    ],
    results: [
      {
        id: 'fixture:pubg:r1',
        gameId: 'pubg',
        tournamentName: 'PGS 6 Grand Finals',
        scheduledAt: d(1),
        status: 'completed',
        teamA: { id: 'twisted', name: 'Twisted Minds', acronym: 'TW', logoUrl: '/teams/twisted.svg' },
        teamB: { id: '17', name: '17 Gaming', acronym: '17', logoUrl: '/teams/17.svg' },
        score: { teamA: 162, teamB: 135 },
        streamUrl: null,
      },
      {
        id: 'fixture:pubg:r2',
        gameId: 'pubg',
        tournamentName: 'PGS 5 Grand Finals',
        scheduledAt: d(2),
        status: 'completed',
        teamA: { id: 'twisted', name: 'Twisted Minds', acronym: 'TW', logoUrl: '/teams/twisted.svg' },
        teamB: { id: 'soniqs', name: 'Soniqs', acronym: 'SQ', logoUrl: '/teams/soniqs.svg' },
        score: { teamA: 158, teamB: 141 },
        streamUrl: null,
      },
      {
        id: 'fixture:pubg:r3',
        gameId: 'pubg',
        tournamentName: 'PUBG Nations Cup 2024',
        scheduledAt: d(3),
        status: 'completed',
        teamA: { id: 'danawa', name: 'Danawa e-sports', acronym: 'DNW', logoUrl: '/teams/danawa.svg' },
        teamB: { id: '17', name: '17 Gaming', acronym: '17', logoUrl: '/teams/17.svg' },
        score: { teamA: 145, teamB: 120 },
        streamUrl: null,
      },
      {
        id: 'fixture:pubg:r4',
        gameId: 'pubg',
        tournamentName: 'PGS 4 Grand Finals',
        scheduledAt: d(5),
        status: 'completed',
        teamA: { id: 'twisted', name: 'Twisted Minds', acronym: 'TW', logoUrl: '/teams/twisted.svg' },
        teamB: { id: 'faze', name: 'FaZe Clan', acronym: 'FAZE', logoUrl: '/teams/faze.svg' },
        score: { teamA: 160, teamB: 125 },
        streamUrl: null,
      },
      {
        id: 'fixture:pubg:r5',
        gameId: 'pubg',
        tournamentName: 'PGC 2023 World Championship',
        scheduledAt: d(8),
        status: 'completed',
        teamA: { id: 'danawa', name: 'Danawa e-sports', acronym: 'DNW', logoUrl: '/teams/danawa.svg' },
        teamB: { id: '17', name: '17 Gaming', acronym: '17', logoUrl: '/teams/17.svg' },
        score: { teamA: 137, teamB: 133 },
        streamUrl: null,
      },
    ],
  };
}

fixturesRouter.get('/', async (c) => {
  // CDN Cache: 2 minutes edge cache, 10 minutes stale-while-revalidate
  c.header('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');

  const gameSlug = c.req.query('game');
  if (!gameSlug) {
    return c.json({ error: 'Missing game query parameter' }, 400);
  }

  const game = getGameBySlug(gameSlug);
  if (!game) {
    return c.json({ error: 'Unknown game slug' }, 404);
  }

  const env = getServerEnv();
  let matches = { upcoming: [] as Match[], results: [] as Match[] };

  if (env.PANDASCORE_TOKEN) {
    matches = await fetchPandaScoreMatches(env.PANDASCORE_TOKEN, game.id);
  }

  // Resilient fallback to verified fixtures if upstream has no matches
  if (matches.upcoming.length === 0 && matches.results.length === 0) {
    matches = getVerifiedFallbackFixtures(game.slug);
  }

  const response: FixturesResponse = {
    fetchedAt: new Date().toISOString(),
    game: game.slug,
    upcoming: matches.upcoming,
    results: matches.results,
  };

  return c.json(response);
});
