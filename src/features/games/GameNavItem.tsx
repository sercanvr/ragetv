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
            'group relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 select-none bg-transparent',
            'hover:bg-foreground/5 active:scale-[0.98]',
            isActive
              ? 'text-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          )
        }
        title={isCollapsed ? undefined : game.name}
      >
        {({ isActive }) => (
          <>
            {/* Active Accent Bar on the far right edge of the sidebar */}
            {isActive && (
              <span className="absolute -right-3 top-0 bottom-0 w-[4px] bg-[#FC3564] rounded-l-full shadow-[0_0_12px_#FC3564]" />
            )}

            {/* Game Logo or Icon with static indicator dot */}
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              {game.logoUrl ? (
                <img
                  src={game.logoUrl}
                  alt={game.name}
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <FallbackIcon className="w-5 h-5 text-muted-foreground" />
              )}

              {/* Static Live Dot (Red if live, light gray if offline) */}
              <span
                className={cn(
                  'absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background',
                  isLive ? 'bg-red-500' : 'bg-gray-400 dark:bg-gray-600'
                )}
                title={isLive ? 'Canlı Yayın Var' : 'Yayın Yok'}
              />
            </div>

            {/* Title & Short Tag */}
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-sm font-medium tracking-tight truncate">
                    {game.name}
                  </span>
                  {isLive && <Badge variant="live">LIVE</Badge>}
                </div>
                <p className="text-[11px] text-muted-foreground/80 truncate font-normal">
                  {game.tagline}
                </p>
              </div>
            )}
          </>
        )}
      </NavLink>

      {/* User Requested Tooltip when collapsed */}
      {isCollapsed && (
        <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 z-[9999] pointer-events-none opacity-0 group-hover/item:opacity-100 transition-all duration-200 ease-out whitespace-nowrap">
          <div className="relative bg-[#FC3564] text-white text-[11px] font-bold px-2.5 py-1 rounded-[8px] text-center shadow-lg flex items-center justify-center">
            {game.shortName || game.name}
            {/* Triangle pointer */}
            <span
              className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-[#FC3564]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
