import { Stream } from '../../../shared/schemas/stream';
import { getTwitchAppToken } from './token';
import { mapTwitchStreamToDomain, TwitchHelixStreamItem } from './mapper';
import { isChannelBlocked } from '../../../shared/registry/killswitch';

export async function fetchTwitchLiveStreams(
  clientId: string,
  clientSecret: string,
  logins: string[]
): Promise<Stream[]> {
  const activeLogins = logins.filter((login) => !isChannelBlocked(login));
  if (activeLogins.length === 0) return [];

  const token = await getTwitchAppToken(clientId, clientSecret);
  if (!token) return [];

  try {
    const url = new URL('https://api.twitch.tv/helix/streams');
    for (const login of activeLogins) {
      url.searchParams.append('user_login', login.toLowerCase());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url.toString(), {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return [];
    }

    const json = (await res.json()) as { data?: TwitchHelixStreamItem[] };
    if (!json.data || !Array.isArray(json.data)) {
      return [];
    }

    return json.data.map(mapTwitchStreamToDomain);
  } catch {
    return [];
  }
}
