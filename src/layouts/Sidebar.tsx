import React from 'react';
import { useTranslation } from 'react-i18next';
import { GAMES_REGISTRY } from '@shared/registry/games';
import { GameNavItem } from '@/features/games/GameNavItem';
import { cn } from '@/lib/utils';

interface SidebarProps {
  liveSlugs?: string[];
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  liveSlugs = [],
  isCollapsed = false,
}) => {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col shrink-0 bg-surface-deep shadow-none transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-40 h-full',
        isCollapsed ? 'w-16 overflow-visible' : 'w-[176px] tv:w-[210px]'
      )}
    >
      {/* Category Header */}
      <div className="h-10 px-3 flex items-center justify-between overflow-hidden shrink-0">
        <span
          className={cn(
            'text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
            isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[120px] opacity-100'
          )}
        >
          {t('games.title')}
        </span>
      </div>

      {/* Games Navigation List (Flush to Left and Right Edges) */}
      <div className={cn('flex-1 px-0 py-1 space-y-1', isCollapsed ? 'overflow-visible' : 'overflow-y-auto')}>
        {GAMES_REGISTRY.map((game) => (
          <GameNavItem
            key={game.id}
            game={game}
            isCollapsed={isCollapsed}
            isLive={liveSlugs.includes(game.slug)}
          />
        ))}
      </div>

      {/* Sidebar Footer status note */}
      <div className="p-3 border-t border-surface-border/40 text-center overflow-hidden shrink-0">
        <p
          className={cn(
            'text-[10px] text-muted-foreground/60 tracking-wider uppercase font-semibold transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
            isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[180px] opacity-100'
          )}
        >
          RageTV Esports 2026
        </p>
      </div>
    </aside>
  );
};
