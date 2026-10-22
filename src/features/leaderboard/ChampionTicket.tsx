import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { GameLeaderboard } from '@shared/registry/leaderboard';

interface ChampionTicketProps {
  champion: GameLeaderboard['champion'];
}

export const ChampionTicket: React.FC<ChampionTicketProps> = ({ champion }) => {
  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#201810] via-[#1A1815] to-[#251E14] dark:from-[#1E1710] dark:via-[#161412] dark:to-[#221B12] border border-amber-500/35 transition-opacity duration-150 hover:opacity-90 select-none shadow-2xl flex">
      {/* Ticket Left: Main Event & Champion Credentials */}
      <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between gap-3 min-w-0 rounded-l-2xl overflow-hidden">
        {/* Top Header Badge & Date */}
        <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
              <Trophy className="w-3.5 h-3.5 fill-amber-400" />
            </span>
            <span className="font-display text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
              {champion.badge}
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold text-amber-300/80 px-2 py-0.5 rounded-full bg-black/40 border border-amber-500/20">
            {champion.dates}
          </span>
        </div>

        {/* Center: Champion Team Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-black/60 border border-amber-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-inner">
            <img
              src={champion.logoUrl}
              alt={champion.teamName}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-display text-sm sm:text-base font-bold text-amber-100 truncate">
                {champion.teamName}
              </h4>
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <p className="text-[11px] text-amber-200/70 truncate mt-0.5 font-medium">
              {champion.tournament}
            </p>
          </div>
        </div>

        {/* Footer: Venue & Match Status */}
        <div className="flex items-center justify-between text-[10px] text-amber-400/60 font-mono pt-1">
          <span className="truncate">RESMİ GRAND FINALS ŞAMPİYONU</span>
          <span className="font-bold text-amber-400 tracking-wider">#1 VICTORY</span>
        </div>
      </div>

      {/* Ticket Perforation / Divider with Circular Notches Masking Top/Bottom Borders */}
      <div className="relative flex flex-col items-center justify-between py-1 shrink-0 w-4">
        {/* Top Notch Hole (Overlays border-t, completely masking horizontal line with canvas bg) */}
        <span className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full bg-surface-base border-b border-l border-r border-amber-500/40 z-20 pointer-events-none" />

        {/* Vertical Perforated Dashes */}
        <div className="w-[1.5px] h-full my-2 bg-[repeating-linear-gradient(to_bottom,#F59E0B66_0_4px,transparent_4px_8px)] opacity-60" />

        {/* Bottom Notch Hole (Overlays border-b, completely masking horizontal line with canvas bg) */}
        <span className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full bg-surface-base border-t border-l border-r border-amber-500/40 z-20 pointer-events-none" />
      </div>

      {/* Ticket Right: Stub (Vertical Stamp) */}
      <div className="w-12 sm:w-14 bg-amber-500/10 border-l border-amber-500/20 flex flex-col items-center justify-center p-2 text-center shrink-0 rounded-r-2xl overflow-hidden">
        <span
          className="font-display text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-amber-400/80 select-none whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          ADMIT ONE 2026
        </span>
      </div>
    </div>
  );
};
