/**
 * Embed URL builders and host allowlist validation.
 * Strictly adheres to official provider documentation.
 * Enforces NO-AUTOPLAY policy to prevent user jump scares.
 */

export const ALLOWED_EMBED_HOSTS = [
  'player.twitch.tv',
  'www.youtube-nocookie.com',
  'www.youtube.com',
] as const;

export function buildTwitchEmbedUrl(channelLogin: string, currentHost: string, muted = true): string {
  const cleanLogin = encodeURIComponent(channelLogin.trim().toLowerCase());
  // Normalize parent host (remove port if local dev)
  const parentHost = currentHost.split(':')[0] || 'localhost';
  // Autoplay is strictly FALSE by default, muted is true
  return `https://player.twitch.tv/?channel=${cleanLogin}&parent=${encodeURIComponent(parentHost)}&muted=${muted}&autoplay=false`;
}

export function buildTwitchVodUrl(videoId: string, currentHost: string): string {
  const cleanId = encodeURIComponent(videoId.replace(/^v/, ''));
  const parentHost = currentHost.split(':')[0] || 'localhost';
  return `https://player.twitch.tv/?video=v${cleanId}&parent=${encodeURIComponent(parentHost)}&autoplay=false`;
}

export function buildYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const cleanId = encodeURIComponent(videoId.trim());
  return `https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1&vq=hd1080&playsinline=1`;
}

export function isAllowedEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    return (ALLOWED_EMBED_HOSTS as readonly string[]).includes(parsed.hostname);
  } catch {
    return false;
  }
}
