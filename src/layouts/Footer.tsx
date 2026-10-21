import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ExternalLink } from 'lucide-react';

const ESPORTS_PLATFORMS = [
  { name: 'Kick', url: 'https://kick.com' },
  { name: 'Twitch', url: 'https://www.twitch.tv' },
  { name: 'HLTV.org', url: 'https://www.hltv.org' },
  { name: 'ESL Gaming', url: 'https://www.esl.com' },
  { name: 'Esports World Cup', url: 'https://esportsworldcup.com' },
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <footer id="disclaimer" className="relative w-full border-t border-surface-border bg-surface-deep/80 mt-auto pt-10 pb-8 px-6 sm:px-8">
      {/* Top Ambient Glow / Degrade Aydınlanma (Dual-Theme Compatible) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#D84040]/40 to-transparent shadow-[0_0_15px_rgba(216,64,64,0.4)] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 text-sm text-muted-foreground">
        {/* Column 1: Brand & About (Click to Refresh) */}
        <div className="space-y-3.5">
          <div
            onClick={handleLogoClick}
            className="inline-flex items-center gap-2.5 cursor-pointer hover:opacity-75 active:opacity-50 transition-none"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-display font-extrabold text-lg tracking-wider text-foreground">
              RAGE<span className="text-[#D84040]">TV</span>
            </span>
          </div>
          <p className="leading-relaxed text-xs sm:text-sm text-muted-foreground/80 max-w-sm">
            RageTV, espor tutkunlarına video barındırmaksızın sadece resmi yayıncı platformlarının embed oynatıcıları aracılığıyla kesintisiz, saf ve şeffaf canlı espor deneyimi sunar.
          </p>
        </div>

        {/* Column 2: Legal / Yasal */}
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-1.5 text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-[#D84040]" />
            <span>Yasal & Telif Politikası</span>
          </div>
          <p className="leading-relaxed text-xs sm:text-sm text-muted-foreground/80">
            {t('disclaimer')}
          </p>
          <div className="pt-1 flex items-center gap-3 text-xs sm:text-sm">
            <a
              href="https://github.com/sercanvr/ragetv"
              target="_blank"
              rel="noreferrer"
              className="text-[#D84040] hover:underline inline-flex items-center gap-1 font-medium"
            >
              Kaynak Kod <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://github.com/sercanvr/ragetv/issues"
              target="_blank"
              rel="noreferrer"
              className="text-[#D84040] hover:underline inline-flex items-center gap-1 font-medium"
            >
              Takedown Bildirimi <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Column 3: Official Esports Platforms */}
        <div className="space-y-3.5">
          <h4 className="text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm">
            Resmi Espor Platformları
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            {ESPORTS_PLATFORMS.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground/90 hover:text-[#D84040] hover:underline inline-flex items-center gap-1.5 transition-none"
                >
                  <span>{platform.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Center Copyright (No Upper Border Line) */}
      <div className="pt-2 text-center text-xs text-muted-foreground/70">
        <p>© 2026 RageTV.</p>
      </div>
    </footer>
  );
};
