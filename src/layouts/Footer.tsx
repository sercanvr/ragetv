import React from 'react';
import { ShieldCheck } from 'lucide-react';
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
    <footer id="disclaimer" className="footer-solid-bg relative w-full border border-neutral-300/80 dark:border-white/[0.12] border-t-[#D84040]/50 dark:border-t-[#D84040]/60 bg-[#121216] mt-16 sm:mt-24 pt-10 pb-16 sm:pt-14 sm:pb-12 min-h-0 sm:min-h-[480px] flex flex-col justify-between px-6 sm:px-10 lg:px-12 rounded-2xl sm:rounded-3xl shadow-none overflow-hidden shrink-0">
      {/* 1. Top Border Line Accent (Rounded to perfectly trace the top corners in both themes) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D84040] to-transparent shadow-[0_0_15px_rgba(216,64,64,0.7)] pointer-events-none z-10 rounded-t-2xl sm:rounded-t-3xl" />

      {/* 2. Top Interior Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[260px] bg-[radial-gradient(ellipse_at_top,_rgba(216,64,64,0.22)_0%,_rgba(216,64,64,0.06)_45%,_transparent_75%)] pointer-events-none z-10 blur-2xl" />

      {/* 3. Solid Curved Globe Horizon World Map (Soft subtle opacity) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0 opacity-40 dark:opacity-30">
        <WorldMap className="w-full h-full text-neutral-900/[0.12] dark:text-white/[0.14]" />
      </div>

      <div className="relative z-10 w-full max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 pb-8 text-sm text-muted-foreground items-start">
        {/* Column 1: Brand Logo & Statement (Left Aligned) */}
        <div className="space-y-4 max-w-sm">
          <div
            onClick={handleLogoClick}
            className="inline-flex items-center cursor-pointer hover:opacity-85 active:opacity-60 transition-opacity"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV Logo"
              className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.85)] drop-shadow-[0_1px_1px_rgba(0,0,0,0.95)]"
            />
          </div>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90 max-w-md">
            RageTV, espor tutkunlarına video barındırmaksızın sadece resmi yayıncı platformlarının embed oynatıcıları aracılığıyla kesintisiz, saf ve şeffaf canlı espor deneyimi sunar.
          </p>
        </div>

        {/* Column 2: Legal / Yasal & Telif Politikası in Center (Top Center Aligned) */}
        <div className="space-y-3.5 max-w-md md:mx-auto flex flex-col items-start md:items-center text-left md:text-center">
          <h4 className="inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
            <ShieldCheck className="w-4 h-4 text-[#D84040]" />
            <span>Yasal & Telif Politikası</span>
          </h4>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90">
            RageTV, bağımsız ve ticari olmayan bir espor keşif sitesidir. Hiçbir video içeriğini barındırmaz, kaydetmez veya yeniden yayınlamaz. Canlı yayınlar ve videolar resmi gömülü oynatıcılar aracılığıyla gösterilir.
          </p>
          <div className="pt-2 flex flex-col gap-2.5 w-full max-w-[240px] items-stretch">
            <a
              href="https://github.com/sercanvr/ragetv"
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#18181E] border border-neutral-300 dark:border-white/15 text-neutral-900 dark:text-white hover:bg-[#18181B] hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold text-xs inline-flex items-center justify-center transition-colors duration-150 shadow-sm cursor-pointer"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://github.com/sercanvr/ragetv/issues"
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#18181E] border border-neutral-300 dark:border-white/15 text-neutral-900 dark:text-white hover:bg-[#18181B] hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold text-xs inline-flex items-center justify-center transition-colors duration-150 shadow-sm cursor-pointer"
            >
              <span>Takedown Bildirimi</span>
            </a>
          </div>
        </div>

        {/* Column 3: Official Platforms Symmetrically Positioned on Far Right */}
        <div className="space-y-3.5 flex flex-col items-start md:items-start md:justify-self-end w-full max-w-[200px]">
          <h4 className="font-bold tracking-wider uppercase text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
            Resmi Platformlar
          </h4>
          <ul className="flex flex-col gap-y-2 text-xs sm:text-sm">
            {OFFICIAL_PLATFORMS.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 dark:text-muted-foreground/90 hover:text-[#D84040] hover:underline inline-block transition-none"
                >
                  {platform.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Center Copyright */}
      <div className="relative z-10 pt-8 pb-4 text-center text-xs text-muted-foreground/70">
        <p>© 2026 RageTV.</p>
      </div>
    </footer>
  );
};
