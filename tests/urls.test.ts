import { describe, it, expect } from 'vitest';
import { buildTwitchEmbedUrl, buildYouTubeEmbedUrl, isAllowedEmbedUrl } from '../shared/urls';

describe('Embed URL Builders & Security Allowlist', () => {
  it('should build valid Twitch embed URL with parent parameter', () => {
    const url = buildTwitchEmbedUrl('eslcs', 'ragetv.app');
    expect(url).toBe('https://player.twitch.tv/?channel=eslcs&parent=ragetv.app&muted=true&autoplay=false');
  });

  it('should strip port from host in Twitch parent parameter', () => {
    const url = buildTwitchEmbedUrl('blastpremier', 'localhost:5173');
    expect(url).toBe('https://player.twitch.tv/?channel=blastpremier&parent=localhost&muted=true&autoplay=false');
  });

  it('should build valid YouTube no-cookie embed URL', () => {
    const url = buildYouTubeEmbedUrl('f02mOEt11OQ', true);
    expect(url).toBe('https://www.youtube-nocookie.com/embed/f02mOEt11OQ?autoplay=1&rel=0&modestbranding=1');
  });

  it('should validate allowed hosts strictly', () => {
    expect(isAllowedEmbedUrl('https://player.twitch.tv/?channel=eslcs')).toBe(true);
    expect(isAllowedEmbedUrl('https://www.youtube-nocookie.com/embed/xyz')).toBe(true);
    expect(isAllowedEmbedUrl('https://evil-site.com/embed')).toBe(false);
    expect(isAllowedEmbedUrl('javascript:alert(1)')).toBe(false);
  });
});
