interface CachedToken {
  accessToken: string;
  expiresAt: number; // timestamp in ms
}

let cachedToken: CachedToken | null = null;

export async function getTwitchAppToken(
  clientId: string,
  clientSecret: string
): Promise<string | null> {
  const now = Date.now();

  // Return cached token if valid (with 60s buffer)
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.accessToken;
  }

  try {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });

    const res = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as { access_token: string; expires_in: number };
    if (!data.access_token) return null;

    cachedToken = {
      accessToken: data.access_token,
      expiresAt: now + data.expires_in * 1000,
    };

    return cachedToken.accessToken;
  } catch {
    return null;
  }
}
