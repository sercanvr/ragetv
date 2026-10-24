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
    <div className="champion-card group relative h-80 sm:h-[350px] w-full rounded-[26px] overflow-hidden bg-[#131317] border-2 border-neutral-700/80 dark:border-white/15 hover:border-neutral-400 dark:hover:border-white/40 transition-colors duration-150 flex flex-col justify-between cursor-pointer select-none smooth-elevation-shadow">
      {/* Diagram Timeline Node Connectors (Flush on Left & Right Edges) */}
      <span className="hidden md:block absolute -left-[5px] top-[48%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#18181D] border-2 border-neutral-400 dark:border-white/40 z-30 pointer-events-none" />
      <span className="hidden md:block absolute -right-[5px] top-[48%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#18181D] border-2 border-neutral-400 dark:border-white/40 z-30 pointer-events-none" />

      {/* Top-Left Specular Corner Sheen Reflection (Zero Blur) */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-white/15 via-white/5 to-transparent pointer-events-none rounded-tl-[24px] z-10" />

      {/* Cyber Esports Micro-Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Central Subtle Stage Gradient (Zero Blur) */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

      {/* Atmospheric Background Watermark Logo (Crisp, Subtle Opacity, Zero Blur) */}
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden pointer-events-none opacity-15">
        <img
          src={champion.logoUrl}
          alt=""
          className="w-56 h-56 object-contain filter grayscale select-none scale-110"
        />
      </div>

      {/* Top Header: Solid Year Badge & Trophy Icon (Zero Blur) */}
      <div className="relative z-20 p-4 flex items-center justify-between">
        <div className="champion-badge relative px-3.5 py-1.5 rounded-xl bg-[#09090C] border border-white/20 shadow-sm flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider text-white">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-white champion-badge">{champion.year}</span>
        </div>
        <div className="w-8 h-8 rounded-xl bg-[#09090C] border border-white/15 flex items-center justify-center text-amber-400 shadow-sm">
          <Trophy className="w-4 h-4" />
        </div>
      </div>

      {/* Center: Prominent Big Team Logo (Stationary, Zero Jumping on Hover) */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-4 -mt-2">
        <img
          src={champion.logoUrl}
          alt={champion.teamName}
          className="w-28 h-28 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] select-none"
        />
      </div>

      {/* Bottom: Solid Dark Bar with Team Name & Tournament (Silky Rounded Corners, Zero Blur) */}
      <div className="relative z-20 w-full px-5 py-4 bg-[#09090C] border-t border-white/15 rounded-b-[24px] flex flex-col items-center justify-center text-center">
        <h4 className="champion-title text-gradient-title font-bold text-sm sm:text-base tracking-wide truncate w-full font-display">
          {champion.teamName}
        </h4>
        <div className="w-full my-1.5 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <p className="champion-sub text-[11px] sm:text-xs text-neutral-300 truncate w-full font-medium">
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
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-gradient-title">
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
