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
  const FallbackIcon = ICON_MAP[game.icon] || Flame;

  return (
    <div className="relative group/item">
      <NavLink
        to={`/${game.slug}`}
        onClick={onSelect}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 select-none',
            'hover:bg-white/5 active:scale-[0.98]',
            isActive
              ? 'bg-brand/10 text-white border border-brand/30 shadow-[0_0_20px_-5px_rgba(252,53,100,0.3)]'
              : 'text-gray-400 hover:text-gray-200 border border-transparent'
          )
        }
        title={isCollapsed ? undefined : game.name}
      >
        {({ isActive }) => (
          <>
            {/* Active Accent Bar */}
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand rounded-r-full shadow-[0_0_10px_#FC3564]" />
            )}

            {/* Game Logo or Icon */}
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden transition-colors',
                isActive
                  ? 'bg-brand/20 border border-brand/40 shadow-brand-glow'
                  : 'bg-surface-panel/80 border border-surface-border group-hover:border-surface-borderLight'
              )}
            >
              {game.logoUrl ? (
                <img
                  src={game.logoUrl}
                  alt={game.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <FallbackIcon className="w-4 h-4 text-gray-300" />
              )}
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

      {/* User Requested Tooltip when collapsed */}
      {isCollapsed && (
        <div className="absolute left-[calc(100%+11px)] top-1/2 -translate-y-1/2 z-[9999] pointer-events-none opacity-0 group-hover/item:opacity-100 transition-all duration-200 ease-out whitespace-nowrap">
          <div className="relative min-w-[80px] bg-[#FC3564] text-white text-xs font-bold px-4 py-2.5 rounded-[10px] text-center shadow-2xl flex items-center justify-center">
            {game.shortName || game.name}
            {/* Triangle pointer matching user specification */}
            <span
              className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#FC3564]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
