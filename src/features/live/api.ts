import { LiveStatusResponse, LiveStatusResponseSchema } from '@shared/schemas/stream';

export async function fetchLiveStatus(): Promise<LiveStatusResponse> {
  const res = await fetch('/api/live');
  if (!res.ok) {
    throw new Error(`Failed to fetch live status: ${res.status}`);
  }
  const json = await res.json();
  return LiveStatusResponseSchema.parse(json);
}
