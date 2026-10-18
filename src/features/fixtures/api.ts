import { FixturesResponse, FixturesResponseSchema } from '@shared/schemas/fixture';

export async function fetchGameFixtures(gameSlug: string): Promise<FixturesResponse> {
  const res = await fetch(`/api/fixtures?game=${encodeURIComponent(gameSlug)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch fixtures: ${res.status}`);
  }
  const json = await res.json();
  return FixturesResponseSchema.parse(json);
}
