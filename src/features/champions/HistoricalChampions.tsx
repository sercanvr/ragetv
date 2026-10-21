import React from 'react';
import { Trophy } from 'lucide-react';
import { getHistoricalChampions } from '@shared/registry/historicalChampions';

interface HistoricalChampionsProps {
  gameSlug: string;
}

export const HistoricalChampions: React.FC<HistoricalChampionsProps> = ({ gameSlug }) => {
  const champions = getHistoricalChampions(gameSlug);
  if (!champions || champions.length === 0) return null;

  const firstYear = champions[champions.length - 1]?.year || 2014;
  const latestYear = champions[0]?.year || 2026;

  return (
    <section className="w-full space-y-3 pt-2 select-none">
      {/* Title & Date Range Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
            Geçmiş Şampiyonlar ({latestYear} — {firstYear})
          </h3>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground">
          Dünya / Major Finalleri
        </span>
      </div>

      {/* Horizontal Scrollable Champions Timeline */}
      <div className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {champions.map((item) => (
          <div
            key={`${item.year}-${item.teamName}`}
            className="shrink-0 w-36 sm:w-40 rounded-xl bg-surface-card/70 hover:bg-surface-card backdrop-blur-md border border-surface-border p-3 flex flex-col items-center text-center transition-all duration-150 hover:border-[#D84040]/40 group"
          >
            {/* Year Badge */}
            <span className="font-display text-xs font-extrabold text-[#D84040] tracking-wider mb-2">
              {item.year}
            </span>

            {/* Team Logo in Centered Glass Box */}
            <div className="w-12 h-12 rounded-xl bg-surface-deep/80 border border-surface-border p-1.5 flex items-center justify-center shrink-0 mb-2 group-hover:scale-105 transition-transform">
              <img
                src={item.logoUrl}
                alt={item.teamName}
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Team Name */}
            <h4 className="font-semibold text-xs text-foreground truncate w-full">
              {item.teamName}
            </h4>

            {/* Tournament Title */}
            <p className="text-[10px] text-muted-foreground/80 truncate w-full mt-0.5">
              {item.tournament}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
