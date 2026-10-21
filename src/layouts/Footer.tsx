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
    <footer id="disclaimer" className="relative w-full border-t border-surface-border bg-surface-deep/80 mt-auto pt-8 pb-6 px-6 select-none">
      {/* Top Ambient Glow / Degrade Aydınlanma (Dual-Theme Compatible) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#D84040]/40 to-transparent shadow-[0_0_15px_rgba(216,64,64,0.4)] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 text-xs text-muted-foreground">
        {/* Column 1: Brand & About (Click to Refresh) */}
        <div className="space-y-3">
          <div
            onClick={handleLogoClick}
            className="inline-flex items-center gap-2.5 cursor-pointer hover:opacity-75 active:opacity-50 transition-none select-none"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="font-display font-extrabold text-base tracking-wider text-foreground">
              RAGE<span className="text-[#D84040]">TV</span>
            </span>
          </div>
          <p className="leading-relaxed text-[11px] text-muted-foreground/80 max-w-sm">
            RageTV, espor tutkunlarına video barındırmaksızın sadece resmi yayıncı platformlarının embed oynatıcıları aracılığıyla kesintisiz, saf ve şeffaf canlı espor deneyimi sunar.
          </p>
        </div>

        {/* Column 2: Legal / Yasal */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-foreground font-bold tracking-wider uppercase text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D84040]" />
            <span>Yasal & Telif Politikası</span>
          </div>
          <p className="leading-relaxed text-[11px] text-muted-foreground/80">
            {t('disclaimer')}
          </p>
          <div className="pt-1 flex items-center gap-3 text-[11px]">
            <a
              href="https://github.com/sercanvr/ragetv"
              target="_blank"
              rel="noreferrer"
              className="text-[#D84040] hover:underline inline-flex items-center gap-1"
            >
              Kaynak Kod <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>•</span>
            <a
              href="https://github.com/sercanvr/ragetv/issues"
              target="_blank"
              rel="noreferrer"
              className="text-[#D84040] hover:underline inline-flex items-center gap-1"
            >
              Takedown Bildirimi <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Column 3: Official Esports Platforms */}
        <div className="space-y-3">
          <h4 className="text-foreground font-bold tracking-wider uppercase text-[11px]">
            Resmi Espor Platformları
          </h4>
          <ul className="space-y-1.5 text-[11px]">
            {ESPORTS_PLATFORMS.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground hover:translate-x-0.5 transition-transform inline-flex items-center gap-1.5 text-muted-foreground/90"
                >
                  <span>{platform.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Center Copyright */}
      <div className="pt-4 border-t border-surface-border/50 text-center text-[11px] text-muted-foreground/70">
        <p>© 2026 RageTV.</p>
      </div>
    </footer>
  );
};
