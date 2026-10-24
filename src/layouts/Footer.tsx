import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { WorldMap } from '@/components/ui/WorldMap';

const OFFICIAL_PLATFORMS = [
  { name: 'Twitch', url: 'https://www.twitch.tv' },
  { name: 'YouTube Gaming', url: 'https://gaming.youtube.com' },
  { name: 'Kick', url: 'https://kick.com' },
  { name: 'HLTV.org', url: 'https://www.hltv.org' },
  { name: 'ESL Gaming', url: 'https://www.esl.com' },
  { name: 'Esports World Cup', url: 'https://esportsworldcup.com' },
  { name: 'ESIC', url: 'https://esic.gg' },
  { name: 'Faceit', url: 'https://www.faceit.com' },
  { name: 'Blast', url: 'https://blast.tv' },
  { name: 'DreamHack', url: 'https://dreamhack.com' },
];

export const Footer: React.FC = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <footer id="disclaimer" className="relative w-full border-t border-neutral-300/80 dark:border-white/[0.12] bg-surface-base/95 mt-24 sm:mt-36 pt-20 pb-8 sm:pt-24 sm:pb-10 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between px-6 sm:px-10 lg:px-12 overflow-hidden rounded-b-2xl sm:rounded-b-3xl">
      {/* 1. Top Border Line Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D84040]/60 to-transparent shadow-[0_0_15px_rgba(216,64,64,0.5)] pointer-events-none z-10" />

      {/* 2. Top Interior Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[280px] bg-[radial-gradient(ellipse_at_top,_rgba(216,64,64,0.30)_0%,_rgba(216,64,64,0.10)_45%,_transparent_75%)] pointer-events-none z-10 blur-2xl" />

      {/* 3. Solid Curved Globe Horizon World Map */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
        <WorldMap className="w-full h-full text-neutral-900/[0.05] dark:text-white/[0.07]" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 xl:gap-20 pb-6 text-sm text-muted-foreground">
        {/* Column 1: Brand Logo (Larger with pronounced drop-shadow) & Statement */}
        <div className="space-y-4">
          <div
            onClick={handleLogoClick}
            className="inline-flex items-center cursor-pointer hover:opacity-85 active:opacity-60 transition-opacity"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV Logo"
              className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(216,64,64,0.55)]"
            />
          </div>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90 max-w-md [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            RageTV, espor tutkunlarına video <br className="hidden sm:inline" />
            barındırmaksızın sadece resmi yayıncı <br className="hidden sm:inline" />
            platformlarının embed oynatıcıları aracılığıyla <br className="hidden sm:inline" />
            kesintisiz, saf ve şeffaf canlı espor deneyimi sunar.
          </p>
        </div>

        {/* Column 2: Official Platforms in Center */}
        <div className="space-y-3.5">
          <h4 className="text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Resmi Platformlar
          </h4>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
            {OFFICIAL_PLATFORMS.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 dark:text-muted-foreground/90 hover:text-[#D84040] hover:underline inline-flex items-center gap-1.5 transition-none [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]"
                >
                  <span>{platform.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Legal / Yasal & Telif Politikası on Far Right with Vertical Action Buttons */}
        <div className="space-y-3.5">
          <h4 className="inline-flex items-center gap-1.5 text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            <ShieldCheck className="w-4 h-4 text-[#D84040]" />
            <span>Yasal & Telif Politikası</span>
          </h4>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90 [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            RageTV, bağımsız ve ticari olmayan bir espor keşif sitesidir. <br className="hidden sm:inline" />
            Hiçbir video içeriğini barındırmaz, kaydetmez veya yeniden yayınlamaz. <br className="hidden sm:inline" />
            Canlı yayınlar ve videolar resmi gömülü oynatıcılar aracılığıyla gösterilir.
          </p>
          <div className="pt-2 flex flex-col gap-2 max-w-[210px]">
            <a
              href="https://github.com/sercanvr/ragetv/issues"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-surface-card border border-neutral-300 dark:border-white/10 hover:border-[#D84040]/50 text-foreground font-semibold text-xs inline-flex items-center justify-between transition-colors shadow-sm group"
            >
              <span>Takedown Bildirimi</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D84040] group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/sercanvr/ragetv"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-surface-card border border-neutral-300 dark:border-white/10 hover:border-[#D84040]/50 text-foreground font-semibold text-xs inline-flex items-center justify-between transition-colors shadow-sm group"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D84040] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Center Copyright pushed lower to the absolute bottom */}
      <div className="relative z-10 pt-8 pb-1 text-center text-xs text-muted-foreground/70 [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
        <p>© 2026 RageTV.</p>
      </div>
    </footer>
  );
};
