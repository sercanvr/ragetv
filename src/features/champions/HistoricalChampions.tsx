import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Sparkles } from 'lucide-react';
import { getHistoricalChampions, HistoricalChampion } from '@shared/registry/historicalChampions';

interface HistoricalChampionsProps {
  gameSlug: string;
}

interface ChampionCardProps {
  champion: HistoricalChampion;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ champion }) => {
  return (
    <div className="group relative h-80 sm:h-[340px] w-full rounded-[24px] overflow-hidden p-[2px] bg-gradient-to-b from-neutral-800/95 via-neutral-900/95 to-neutral-950 border-2 border-neutral-700/80 dark:border-white/20 shadow-lg hover:border-neutral-400 dark:hover:border-white/40 transition-colors duration-200 flex flex-col justify-between cursor-pointer select-none">
      {/* Top-Left Specular Corner Reflection (Monochromatic light gleam as in reference) */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-white/30 via-white/5 to-transparent pointer-events-none rounded-tl-[24px] blur-[1px] z-10" />

      {/* Atmospheric Background Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden pointer-events-none opacity-10 dark:opacity-20">
        <img
          src={champion.logoUrl}
          alt=""
          className="w-56 h-56 object-contain filter blur-[1px] select-none"
        />
      </div>

      {/* Top Header: Frosted Glass Year Badge & Trophy Pill */}
      <div className="relative z-20 p-4 flex items-center justify-between">
        <div className="relative px-3.5 py-1.5 rounded-[14px] bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/25 shadow-sm flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider text-white">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{champion.year}</span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground bg-black/60 dark:bg-black/75 px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>ŞAMPİYON</span>
        </span>
      </div>

      {/* Center: Prominent Big Team Logo (Static, zero jumping scale on hover) */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-4 -mt-2">
        <img
          src={champion.logoUrl}
          alt={champion.teamName}
          className="w-32 h-32 sm:w-36 sm:h-36 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] select-none"
        />
      </div>

      {/* Bottom: Team Name & Tournament with Center Divider */}
      <div className="relative z-20 w-full px-5 py-3.5 bg-black/75 dark:bg-black/85 backdrop-blur-xl border-t border-white/10 flex flex-col items-center justify-center text-center">
        <h4 className="font-bold text-sm sm:text-base text-white tracking-wide truncate w-full">
          {champion.teamName}
        </h4>
        <div className="w-full my-1.5 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <p className="text-[11px] sm:text-xs text-gray-300/85 dark:text-muted-foreground truncate w-full font-medium">
          {champion.tournament}
        </p>
      </div>
    </div>
  );
};

export const HistoricalChampions: React.FC<HistoricalChampionsProps> = ({ gameSlug }) => {
  const { t } = useTranslation();
  const champions = getHistoricalChampions(gameSlug);
  if (!champions || champions.length === 0) return null;

  const firstYear = champions[champions.length - 1]?.year || 2013;
  const latestYear = champions[0]?.year || 2025;

  return (
    <section className="w-full space-y-6 pt-6 pb-12 sm:pb-16">
      {/* Title & Date Range Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
            {t('champions.title')} ({latestYear} — {firstYear})
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {t('champions.subtitle')}
        </span>
      </div>

      {/* Dashed Timeline Connector Track Behind Cards */}
      <div className="relative w-full">
        {/* Horizontal Dashed Line (Eksi Eksi Çizgi) Behind Cards */}
        <div className="hidden lg:block absolute top-[45%] left-2 right-2 h-0 border-t-2 border-dashed border-neutral-600/40 dark:border-white/15 pointer-events-none z-0" />

        {/* Responsive Downward Wrapping Wide Champions Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
          {champions.map((item) => (
            <ChampionCard key={`${item.year}-${item.teamName}-${item.tournament}`} champion={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoricalChampions;
