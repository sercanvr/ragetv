import { z } from 'zod';
import { StreamPlatformSchema } from './stream';

export const GameIdSchema = z.enum(['cs2', 'valorant', 'pubg', 'lol', 'dota2']);
export type GameId = z.infer<typeof GameIdSchema>;

export const ChannelRefSchema = z.object({
  platform: StreamPlatformSchema,
  login: z.string(), // e.g. "eslcs", "blastpremier"
  label: z.string(),
  language: z.string().default('en'),
  official: z.boolean().default(true),
  priority: z.number().default(1),
});
export type ChannelRef = z.infer<typeof ChannelRefSchema>;

export const VodSourceRefSchema = z.object({
  platform: StreamPlatformSchema,
  playlistId: z.string().optional(),
  channelId: z.string().optional(),
  defaultVideoId: z.string().optional(),
});
export type VodSourceRef = z.infer<typeof VodSourceRefSchema>;

export const GameDefinitionSchema = z.object({
  id: GameIdSchema,
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  order: z.number(),
  i18nKey: z.string(),
  icon: z.string(),
  tagline: z.string(),
  channels: z.array(ChannelRefSchema),
  vodSource: VodSourceRefSchema,
});
export type GameDefinition = z.infer<typeof GameDefinitionSchema>;
