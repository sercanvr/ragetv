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

  it('should build valid YouTube embed URL', () => {
    const url = buildYouTubeEmbedUrl('f02mOEt11OQ', true);
    expect(url).toBe('https://www.youtube.com/embed/f02mOEt11OQ?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1');
  });

  it('should validate allowed hosts strictly and reject malicious / insecure URLs', () => {
    // Valid HTTPS embeds
    expect(isAllowedEmbedUrl('https://player.twitch.tv/?channel=eslcs')).toBe(true);
    expect(isAllowedEmbedUrl('https://www.youtube-nocookie.com/embed/xyz')).toBe(true);
    expect(isAllowedEmbedUrl('https://www.youtube.com/embed/xyz')).toBe(true);

    // Negative tests: non-HTTPS schemes
    expect(isAllowedEmbedUrl('http://player.twitch.tv/?channel=eslcs')).toBe(false);
    expect(isAllowedEmbedUrl('ftp://player.twitch.tv/')).toBe(false);
    expect(isAllowedEmbedUrl('javascript:alert(1)')).toBe(false);
    expect(isAllowedEmbedUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isAllowedEmbedUrl('vbscript:msgbox(1)')).toBe(false);

    // Negative tests: host spoofing, subdomains, and open redirect vectors
    expect(isAllowedEmbedUrl('https://evil-site.com/embed')).toBe(false);
    expect(isAllowedEmbedUrl('https://player.twitch.tv.evil.com/')).toBe(false);
    expect(isAllowedEmbedUrl('https://attacker.com?https://player.twitch.tv')).toBe(false);
    expect(isAllowedEmbedUrl('//evil.com/embed')).toBe(false);
    expect(isAllowedEmbedUrl('/\\evil.com/embed')).toBe(false);
    expect(isAllowedEmbedUrl('not-even-a-url')).toBe(false);
  });
});
