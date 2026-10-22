import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { WorldMap } from '@/components/ui/WorldMap';

const ESPORTS_PLATFORMS = [
  { name: 'Kick', url: 'https://kick.com' },
  { name: 'Twitch', url: 'https://www.twitch.tv' },
  { name: 'HLTV.org', url: 'https://www.hltv.org' },
  { name: 'ESL Gaming', url: 'https://www.esl.com' },
  { name: 'Esports World Cup', url: 'https://esportsworldcup.com' },
];

export const Footer: React.FC = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <footer id="disclaimer" className="relative w-full border-t border-surface-border bg-surface-deep/95 mt-24 sm:mt-36 pt-20 pb-14 sm:pt-24 sm:pb-16 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between px-6 sm:px-10 lg:px-12 overflow-hidden">
      {/* 1. Top Border Line Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D84040]/60 to-transparent shadow-[0_0_15px_rgba(216,64,64,0.5)] pointer-events-none z-10" />

      {/* 2. Top Interior Ambient Radial Glow (Illuminates down into the center of the footer) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[280px] bg-[radial-gradient(ellipse_at_top,_rgba(216,64,64,0.30)_0%,_rgba(216,64,64,0.10)_45%,_transparent_75%)] pointer-events-none z-10 blur-2xl" />

      {/* 3. Pure Vector SVG Curved Globe Horizon World Map (Flush Full Width, Zero PNG Raster) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
        <WorldMap className="w-full h-full text-neutral-900/[0.08] dark:text-white/[0.13]" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 lg:gap-20 xl:gap-28 pb-10 text-sm text-muted-foreground">
        {/* Column 1: Brand Logo & User-Specified Formatted Mission Statement */}
        <div className="space-y-3.5">
          <div
            onClick={handleLogoClick}
            className="inline-flex items-center cursor-pointer hover:opacity-75 active:opacity-50 transition-none"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV Logo"
              className="h-8 w-auto object-contain filter drop-shadow-md"
            />
          </div>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90 max-w-md [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            RageTV, espor tutkunlarına video <br className="hidden sm:inline" />
            barındırmaksızın sadece resmi yayıncı <br className="hidden sm:inline" />
            platformlarının embed oynatıcıları aracılığıyla <br className="hidden sm:inline" />
            kesintisiz, saf ve şeffaf canlı espor deneyimi sunar.
          </p>
        </div>

        {/* Column 2: Legal / Yasal & Formatted Friendly Telif Politikası */}
        <div className="space-y-3.5">
          <h4 className="inline-flex items-center gap-1.5 text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            <ShieldCheck className="w-4 h-4 text-[#D84040]" />
            <span>Yasal & Telif Politikası</span>
          </h4>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90 [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            RageTV, bağımsız ve ticari olmayan bir espor keşif sitesidir. <br className="hidden sm:inline" />
            Hiçbir video içeriğini barındırmaz, kaydetmez veya yeniden yayınlamaz. <br className="hidden sm:inline" />
            Canlı yayınlar ve videolar, özgün platformların (Twitch, YouTube) <br className="hidden sm:inline" />
            resmi gömülü oynatıcıları aracılığıyla gösterilir ve ilgili sahiplerine aittir.
          </p>
          <div className="pt-1 flex items-center gap-3 text-xs sm:text-sm">
            <a
              href="https://github.com/sercanvr/ragetv"
              target="_blank"
              rel="noreferrer"
              className="text-[#D84040] hover:underline inline-flex items-center gap-1 font-semibold [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
            >
              Kaynak Kod <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://github.com/sercanvr/ragetv/issues"
              target="_blank"
              rel="noreferrer"
              className="text-[#D84040] hover:underline inline-flex items-center gap-1 font-semibold [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
            >
              Takedown Bildirimi <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Column 3: Official Esports Platforms */}
        <div className="space-y-3.5">
          <h4 className="text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Resmi Espor Platformları
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            {ESPORTS_PLATFORMS.map((platform) => (
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
      </div>

      {/* Bottom Center Copyright */}
      <div className="relative z-10 pt-2 text-center text-xs text-muted-foreground/80 [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
        <p>© 2026 RageTV.</p>
      </div>
    </footer>
  );
};
