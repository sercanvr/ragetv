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
    <div className="champion-card group relative h-80 sm:h-[350px] w-full rounded-[26px] overflow-hidden bg-gradient-to-b from-[#1C1C22] via-[#141418] to-[#0A0A0D] border-2 border-neutral-600/70 dark:border-white/20 hover:border-neutral-400 dark:hover:border-white/50 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none smooth-elevation-shadow">
      {/* Diagram Timeline Node Connectors (Flush on Left & Right Edges) */}
      <span className="hidden md:block absolute -left-[5px] top-[48%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#18181D] border-2 border-neutral-400 dark:border-white/40 z-30 pointer-events-none" />
      <span className="hidden md:block absolute -right-[5px] top-[48%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#18181D] border-2 border-neutral-400 dark:border-white/40 z-30 pointer-events-none" />

      {/* Top-Left Specular Corner Sheen Reflection */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-white/25 via-white/5 to-transparent pointer-events-none rounded-tl-[24px] blur-[1px] z-10" />

      {/* Cyber Esports Micro-Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Central Illuminated Stage Spotlight Behind Team Logo */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-white/[0.08] blur-2xl pointer-events-none" />

      {/* Atmospheric Background Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden pointer-events-none opacity-20 dark:opacity-25">
        <img
          src={champion.logoUrl}
          alt=""
          className="w-56 h-56 object-contain filter grayscale blur-[0.5px] select-none scale-110"
        />
      </div>

      {/* Top Header: Clean Frosted Glass Year Badge & Trophy Icon */}
      <div className="relative z-20 p-4 flex items-center justify-between">
        <div className="champion-badge relative px-3.5 py-1.5 rounded-xl bg-black/40 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider !text-white">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="!text-white champion-badge">{champion.year}</span>
        </div>
        <div className="w-8 h-8 rounded-xl bg-black/40 dark:bg-white/5 border border-white/15 flex items-center justify-center text-amber-400 shadow-sm">
          <Trophy className="w-4 h-4" />
        </div>
      </div>

      {/* Center: Prominent Big Team Logo on Illuminated Stage */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-4 -mt-2">
        <img
          src={champion.logoUrl}
          alt={champion.teamName}
          className="w-28 h-28 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] select-none group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Bottom: Team Name & Tournament with Silky Rounded Bottom Corners */}
      <div className="relative z-20 w-full px-5 py-4 bg-black/85 dark:bg-black/95 backdrop-blur-xl border-t border-white/15 rounded-b-[24px] flex flex-col items-center justify-center text-center">
        <h4 className="champion-title font-bold text-sm sm:text-base !text-white tracking-wide truncate w-full font-display">
          {champion.teamName}
        </h4>
        <div className="w-full my-1.5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <p className="champion-sub text-[11px] sm:text-xs !text-neutral-300 truncate w-full font-medium">
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

  return (
    <section className="w-full space-y-6 pt-6 pb-12 sm:pb-16">
      {/* Title & Subtitle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
            {t('champions.title')}
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {t('champions.subtitle')}
        </span>
      </div>

      {/* Dashed Timeline Connector Track Behind Cards */}
      <div className="relative w-full">
        {/* Prominent Horizontal Dashed Diagram Line (Eksi Eksi Çizgi) Connecting Cards */}
        <div className="hidden md:block absolute top-[48%] left-4 right-4 h-0 border-t-2 border-dashed border-neutral-400/90 dark:border-white/35 pointer-events-none z-0" />

        {/* Responsive Downward Wrapping Wide Champions Grid with Generous Spacing for Diagram Lines */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7 sm:gap-8 lg:gap-9">
          {champions.map((item) => (
            <ChampionCard key={`${item.year}-${item.teamName}-${item.tournament}`} champion={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoricalChampions;
