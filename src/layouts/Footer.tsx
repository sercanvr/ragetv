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
    <footer id="disclaimer" className="footer-solid-bg relative w-full border border-neutral-300/80 dark:border-white/[0.12] border-t-[#D84040]/50 dark:border-t-[#D84040]/60 bg-[#121216] mt-16 sm:mt-24 pt-12 pb-24 sm:pt-16 sm:pb-14 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between px-6 sm:px-10 lg:px-12 overflow-hidden rounded-2xl sm:rounded-3xl shadow-none">
      {/* 1. Top Border Line Accent (Prominent and clear) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D84040] to-transparent shadow-[0_0_15px_rgba(216,64,64,0.7)] pointer-events-none z-10" />

      {/* 2. Top Interior Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[260px] bg-[radial-gradient(ellipse_at_top,_rgba(216,64,64,0.22)_0%,_rgba(216,64,64,0.06)_45%,_transparent_75%)] pointer-events-none z-10 blur-2xl" />

      {/* 3. Solid Curved Globe Horizon World Map (Clear and clearly visible in both themes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0 opacity-65 dark:opacity-50">
        <WorldMap className="w-full h-full text-neutral-900/[0.22] dark:text-white/[0.25]" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 xl:gap-20 pb-8 text-sm text-muted-foreground">
        {/* Column 1: Brand Logo (Sharp Black Drop-Shadow) & Statement */}
        <div className="space-y-4">
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

        {/* Column 2: Legal / Yasal & Telif Politikası in Center (Clean, No Enclosing Box, GitHub on Top) */}
        <div className="space-y-3.5">
          <h4 className="inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-[#D84040]" />
            <span className="text-gradient-title">Yasal & Telif Politikası</span>
          </h4>
          <p className="leading-relaxed text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground/90">
            RageTV, bağımsız ve ticari olmayan bir espor keşif sitesidir. Hiçbir video içeriğini barındırmaz, kaydetmez veya yeniden yayınlamaz. Canlı yayınlar ve videolar resmi gömülü oynatıcılar aracılığıyla gösterilir.
          </p>
          <div className="pt-2 flex flex-col gap-2.5 w-full max-w-[240px]">
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

        {/* Column 3: Official Platforms on the Far Right (Vertical List, No External Link Icons) */}
        <div className="space-y-3.5 flex flex-col items-start md:items-start">
          <h4 className="font-bold tracking-wider uppercase text-xs sm:text-sm text-gradient-title">
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

      {/* Bottom Center Copyright pushed lower to the absolute bottom */}
      <div className="relative z-10 pt-12 pb-6 sm:pb-4 text-center text-xs text-muted-foreground/70">
        <p>© 2026 RageTV.</p>
      </div>
    </footer>
  );
};
