import React from 'react';
import { useTranslation } from 'react-i18next';
import { GAMES_REGISTRY } from '@shared/registry/games';
import { GameNavItem } from '@/features/games/GameNavItem';
import { cn } from '@/lib/utils';

interface SidebarProps {
  liveSlugs?: string[];
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  liveSlugs = [],
  isCollapsed = false,
}) => {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col shrink-0 rounded-2xl bg-surface-deep/90 backdrop-blur-md border border-surface-border/50 transition-all duration-300 z-40 select-none shadow-sm',
        isCollapsed ? 'w-16 overflow-visible' : 'w-[210px] tv:w-[260px]'
      )}
    >
      {/* Category Header */}
      <div className="px-4 pt-4 pb-2">
        {!isCollapsed && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
            {t('games.title')}
          </span>
        )}
      </div>

      {/* Games Navigation List */}
      <div className={cn('flex-1 px-2.5 py-1 space-y-2', isCollapsed ? 'overflow-visible' : 'overflow-y-auto')}>
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
      {!isCollapsed && (
        <div className="p-3 border-t border-surface-border/40 text-center">
          <p className="text-[10px] text-muted-foreground/60 tracking-wider uppercase font-semibold">
            RageTV Esports 2026
          </p>
        </div>
      )}
    </aside>
  );
};
