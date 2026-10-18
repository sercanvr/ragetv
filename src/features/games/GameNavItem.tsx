import React from 'react';
import { NavLink } from 'react-router-dom';
import { Crosshair, ShieldAlert, Target, Swords, Flame, LucideIcon } from 'lucide-react';
import { GameDefinition } from '@shared/schemas/game';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

const ICON_MAP: Record<string, LucideIcon> = {
  Crosshair,
  ShieldAlert,
  Target,
  Sword: Swords,
  Flame,
};

interface GameNavItemProps {
  game: GameDefinition;
  isCollapsed?: boolean;
  isLive?: boolean;
  onSelect?: () => void;
}

export const GameNavItem: React.FC<GameNavItemProps> = ({
  game,
  isCollapsed = false,
  isLive = false,
  onSelect,
}) => {
  const Icon = ICON_MAP[game.icon] || Flame;

  return (
    <NavLink
      to={`/${game.slug}`}
      onClick={onSelect}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 select-none',
          'hover:bg-white/5 active:scale-[0.98]',
          isActive
            ? 'bg-brand/10 text-white border border-brand/30 shadow-[0_0_20px_-5px_rgba(252,53,100,0.3)]'
            : 'text-gray-400 hover:text-gray-200 border border-transparent'
        )
      }
      title={game.name}
    >
      {({ isActive }) => (
        <>
          {/* Active Accent Bar */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand rounded-r-full shadow-[0_0_10px_#FC3564]" />
          )}

          {/* Game Icon */}
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
              isActive
                ? 'bg-brand text-white shadow-brand-glow'
                : 'bg-surface-panel text-gray-400 group-hover:text-white group-hover:bg-surface-card'
            )}
          >
            <Icon className="w-4 h-4" />
          </div>

          {/* Title & Short Tag */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-sm font-semibold truncate tracking-tight">
                  {game.name}
                </span>
                {isLive && <Badge variant="live">LIVE</Badge>}
              </div>
              <p className="text-[11px] text-gray-500 truncate font-normal">
                {game.tagline}
              </p>
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};
