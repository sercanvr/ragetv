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
    <div
      className="group relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-surface-border bg-gradient-to-b from-surface-card/90 via-surface-card to-surface-deep/95 shadow-md hover:shadow-2xl hover:border-[#D84040]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
    >
      {/* Top Header: Year Badge & Championship Trophy Tag */}
      <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between">
        <span className="font-display font-black text-xs text-[#D84040] uppercase tracking-wider bg-[#D84040]/15 px-2.5 py-0.5 rounded-full border border-[#D84040]/30 shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>{champion.year}</span>
        </span>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground bg-black/30 dark:bg-black/50 px-2 py-0.5 rounded-full border border-surface-border flex items-center gap-1">
          <Trophy className="w-3 h-3 text-amber-400" />
          <span>ŞAMPİYON</span>
        </span>
      </div>

      {/* Atmospheric Background Watermark Logo with Hover Scale */}
      <div className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden pointer-events-none opacity-10 dark:opacity-15">
        <img
          src={champion.logoUrl}
          alt=""
          className="w-40 h-40 object-contain filter blur-[1px] group-hover:scale-125 transition-transform duration-500 select-none"
        />
      </div>

      {/* Center: Big Prominent Team Logo */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 -mt-2">
        <img
          src={champion.logoUrl}
          alt={champion.teamName}
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300 select-none"
        />
      </div>

      {/* Bottom: Horizontal Blurred Glassmorphism Bar with Team Name */}
      <div className="relative z-10 w-full px-3 py-2.5 bg-black/45 dark:bg-black/60 backdrop-blur-md border-t border-white/10 dark:border-white/5 flex flex-col items-center justify-center text-center transition-colors group-hover:bg-black/60">
        <h4 className="font-bold text-sm sm:text-base text-white dark:text-foreground tracking-wide truncate w-full group-hover:text-[#D84040] transition-colors">
          {champion.teamName}
        </h4>
        <p className="text-[10px] sm:text-[11px] text-gray-300/80 dark:text-muted-foreground truncate w-full mt-0.5 font-medium">
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

  const firstYear = champions[champions.length - 1]?.year || 2014;
  const latestYear = champions[0]?.year || 2026;

  return (
    <section className="w-full space-y-4 pt-4 pb-12 sm:pb-16">
      {/* Title & Date Range Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
            {t('champions.title')} ({latestYear} — {firstYear})
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {t('champions.subtitle')}
        </span>
      </div>

      {/* Responsive Downward Wrapping Champions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
        {champions.map((item) => (
          <ChampionCard key={`${item.year}-${item.teamName}`} champion={item} />
        ))}
      </div>
    </section>
  );
};
