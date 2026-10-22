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
    <div className="group relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-surface-border bg-gradient-to-b from-surface-card/95 via-surface-card to-surface-deep/95 shadow-md hover:shadow-2xl hover:border-[#D84040]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none">
      {/* Top Header: Year Badge & Championship Trophy Tag */}
      <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between">
        <span className="font-display font-black text-xs sm:text-sm text-[#D84040] uppercase tracking-wider bg-[#D84040]/15 px-3 py-1 rounded-full border border-[#D84040]/30 shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D84040]" />
          <span>{champion.year}</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground bg-black/40 dark:bg-black/60 px-2.5 py-1 rounded-full border border-surface-border/60 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>ŞAMPİYON</span>
        </span>
      </div>

      {/* Atmospheric Background Watermark Logo (Fills the Card Body completely) */}
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden pointer-events-none opacity-15 dark:opacity-25">
        <img
          src={champion.logoUrl}
          alt=""
          className="w-52 h-52 object-contain filter blur-[1px] select-none"
        />
      </div>

      {/* Center: Prominent Big Team Logo */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 -mt-2">
        <img
          src={champion.logoUrl}
          alt={champion.teamName}
          className="w-28 h-28 sm:w-36 sm:h-36 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] select-none"
        />
      </div>

      {/* Bottom: Wide Horizontal Frosted Glass Blur Bar with Team Name */}
      <div className="relative z-10 w-full px-4 py-3 bg-black/60 dark:bg-black/75 backdrop-blur-xl border-t border-white/10 dark:border-white/5 flex flex-col items-center justify-center text-center transition-colors group-hover:bg-black/70">
        <h4 className="font-bold text-sm sm:text-base text-white tracking-wide truncate w-full group-hover:text-[#D84040] transition-colors">
          {champion.teamName}
        </h4>
        <p className="text-[11px] sm:text-xs text-gray-300/85 dark:text-muted-foreground truncate w-full mt-0.5 font-medium">
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
    <section className="w-full space-y-5 pt-6 pb-12 sm:pb-16">
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

      {/* Responsive Downward Wrapping Wide Champions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
        {champions.map((item) => (
          <ChampionCard key={`${item.year}-${item.teamName}-${item.tournament}`} champion={item} />
        ))}
      </div>
    </section>
  );
};
