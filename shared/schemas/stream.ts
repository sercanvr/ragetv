import { z } from 'zod';

export const StreamPlatformSchema = z.enum(['twitch', 'youtube']);
export type StreamPlatform = z.infer<typeof StreamPlatformSchema>;

export const StreamSchema = z.object({
  id: z.string(),
  platform: StreamPlatformSchema,
  channel: z.string(),
  title: z.string(),
  language: z.string().default('en'),
  official: z.boolean().default(true),
  viewers: z.number().nullable().default(null),
  thumbnailUrl: z.string().nullable().default(null),
});
export type Stream = z.infer<typeof StreamSchema>;

export const VodItemSchema = z.object({
  id: z.string(),
  platform: StreamPlatformSchema,
  videoId: z.string(),
  title: z.string(),
  publishedAt: z.string(),
  thumbnailUrl: z.string(),
  duration: z.string().optional(),
});
export type VodItem = z.infer<typeof VodItemSchema>;

export const LiveStatusResponseSchema = z.object({
  fetchedAt: z.string(),
  stale: z.boolean(),
  games: z.record(
    z.string(),
    z.object({
      live: z.array(StreamSchema),
      fallbackVod: VodItemSchema.nullable().optional(),
    })
  ),
});
export type LiveStatusResponse = z.infer<typeof LiveStatusResponseSchema>;
