import React from 'react';
import { NavLink } from 'react-router-dom';
import { GameDefinition } from '@shared/schemas/game';
import { cn } from '@/lib/utils';
import { Crosshair, ShieldAlert, Target, Swords, Flame, LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Crosshair,
  ShieldAlert,
  Target,
  Sword: Swords,
  Flame,
};

interface GameTopPillsProps {
  games: GameDefinition[];
  liveSlugs?: string[];
}

export const GameTopPills: React.FC<GameTopPillsProps> = ({
  games,
  liveSlugs = [],
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2.5 px-4 flex items-center gap-2 border-b border-surface-border bg-surface-deep/90 backdrop-blur-md sticky top-0 z-30 lg:hidden">
      {games.map((game) => {
        const Icon = ICON_MAP[game.icon] || Flame;
        const isLive = liveSlugs.includes(game.slug);

        return (
          <NavLink
            key={game.id}
            to={`/${game.slug}`}
            className={({ isActive }) =>
              cn(
                'shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all select-none',
                isActive
                  ? 'bg-brand text-white shadow-brand-glow'
                  : 'bg-surface-card text-gray-300 hover:text-white border border-surface-border'
              )
            }
          >
            {game.logoUrl ? (
              <img src={game.logoUrl} alt={game.shortName} className="w-4 h-4 object-contain shrink-0" />
            ) : (
              <Icon className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{game.shortName}</span>
            {isLive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </NavLink>
        );
      })}
    </div>
  );
};
