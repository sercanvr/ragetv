import { z } from 'zod';
import { GameIdSchema } from './game';

export const MatchTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  acronym: z.string(),
  logoUrl: z.string().nullable().default(null),
});
export type MatchTeam = z.infer<typeof MatchTeamSchema>;

export const MatchStatusSchema = z.enum(['upcoming', 'running', 'completed']);
export type MatchStatus = z.infer<typeof MatchStatusSchema>;

export const MatchSchema = z.object({
  id: z.string(),
  gameId: GameIdSchema,
  tournamentName: z.string(),
  scheduledAt: z.string(), // UTC ISO string
  status: MatchStatusSchema,
  teamA: MatchTeamSchema,
  teamB: MatchTeamSchema,
  score: z
    .object({
      teamA: z.number(),
      teamB: z.number(),
    })
    .nullable()
    .default(null),
  streamUrl: z.string().nullable().default(null),
});
export type Match = z.infer<typeof MatchSchema>;

export const FixturesResponseSchema = z.object({
  fetchedAt: z.string(),
  game: z.string(),
  upcoming: z.array(MatchSchema),
  results: z.array(MatchSchema),
});
export type FixturesResponse = z.infer<typeof FixturesResponseSchema>;
