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
    <div className="relative group/item w-full">
      <NavLink
        to={`/${game.slug}`}
        onClick={onSelect}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center gap-3 px-3 py-2.5 transition-none w-full overflow-hidden',
            isActive
              ? 'text-foreground font-semibold bg-black/[0.11] dark:bg-white/[0.15] backdrop-blur-md border-y border-black/10 dark:border-white/15'
              : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.07] border-y border-transparent'
          )
        }
        title={isCollapsed ? undefined : game.name}
      >
        {({ isActive }) => (
          <>
            {/* Active Accent Bar Flush on Right Edge of Sidebar */}
            {isActive && (
              <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#D84040]" />
            )}

            {/* Game Logo in Liquid Glass Rounded Box with inner depth and static indicator dot */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-transparent dark:from-white/[0.06] dark:via-white/[0.02] dark:to-black/30 backdrop-blur-md border border-black/10 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0 transition-all duration-150 group-hover/item:border-brand/40 group-hover/item:from-brand/10 shadow-inner">
              {game.logoUrl ? (
                <img
                  src={game.logoUrl}
                  alt={game.name}
                  className="w-full h-full object-contain filter drop-shadow-sm"
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
                  'absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-background',
                  isLive ? 'bg-[#D84040]' : 'bg-gray-400 dark:bg-gray-600'
                )}
                title={isLive ? 'Canlı Yayın Var' : 'Yayın Yok'}
              />
            </div>

            {/* Title & Live Status Badge (Clean, vertically centered, no redundant tagline) */}
            <div
              className={cn(
                'flex-1 min-w-0 flex items-center justify-between gap-1.5 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
                isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[160px] opacity-100'
              )}
            >
              <span className="text-sm font-medium tracking-tight truncate">
                {game.name}
              </span>
              {isLive && <Badge variant="live">LIVE</Badge>}
            </div>
          </>
        )}
      </NavLink>

      {/* User Requested Tooltip with FULL Game Name when collapsed */}
      {isCollapsed && (
        <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 z-[9999] pointer-events-none opacity-0 group-hover/item:opacity-100 transition-all duration-200 ease-out whitespace-nowrap">
          <div className="relative bg-[#D84040] text-white text-[11px] font-bold px-3 py-1.5 rounded-[8px] text-center shadow-lg flex items-center justify-center">
            {game.name}
            {/* Triangle pointer */}
            <span
              className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-[#D84040]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
