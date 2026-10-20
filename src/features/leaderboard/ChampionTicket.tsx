import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { GameLeaderboard } from '@shared/registry/leaderboard';

interface ChampionTicketProps {
  champion: GameLeaderboard['champion'];
}

export const ChampionTicket: React.FC<ChampionTicketProps> = ({ champion }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden p-4 bg-gradient-to-br from-amber-500/15 via-surface-card to-surface-card border border-amber-500/30 transition-opacity duration-200 hover:opacity-90 select-none shadow-xl">
      {/* Decorative Golden Accent / Perforated divider look */}
      <div className="flex items-center justify-between gap-3 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Trophy className="w-4 h-4 fill-amber-400" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
            {champion.badge}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-gray-400 bg-surface-deep/80 px-2.5 py-1 rounded-full border border-surface-border">
          {champion.dates}
        </span>
      </div>

      {/* Main Champion Card Row */}
      <div className="flex items-center gap-3.5 pt-3">
        <div className="w-12 h-12 rounded-xl bg-surface-panel/90 border border-surface-border p-1 flex items-center justify-center shrink-0 shadow-lg">
          <img
            src={champion.logoUrl}
            alt={champion.teamName}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-white truncate">
              {champion.teamName}
            </h4>
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          </div>
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {champion.tournament}
          </p>
        </div>
      </div>
    </div>
  );
};
