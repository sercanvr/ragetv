import React from 'react';
import { useTranslation } from 'react-i18next';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
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
  onToggle,
}) => {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col shrink-0 bg-surface-deep border-r border-surface-border transition-all duration-300 z-40 h-full',
        isCollapsed ? 'w-16 overflow-visible' : 'w-[210px] tv:w-[260px]'
      )}
    >
      {/* Category Header with Integrated Toggle Button across from Games title */}
      <div
        className={cn(
          'pt-3 pb-2',
          isCollapsed
            ? 'flex items-center justify-center px-2'
            : 'flex items-center justify-between px-3.5'
        )}
      >
        {!isCollapsed && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
            {t('games.title')}
          </span>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors focus:outline-none"
            title={isCollapsed ? 'Kenar Çubuğunu Aç (B)' : 'Kenar Çubuğunu Daralt (B)'}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <PanelLeft className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftClose className="w-3.5 h-3.5" />
            )}
          </button>
        )}
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
