import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, PanelLeftClose, PanelLeft, Globe, Sun, Moon } from 'lucide-react';
import { GAMES_REGISTRY } from '@shared/registry/games';
import { GameNavItem } from '@/features/games/GameNavItem';
import { cn } from '@/lib/utils';

interface SidebarProps {
  liveSlugs?: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ liveSlugs = [] }) => {
  const { t, i18n } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ragetv_theme') === 'light';
    }
    return false;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('ragetv_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isLight;
    setIsLight(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ragetv_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('ragetv_theme', 'dark');
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'tr' : i18n.language === 'tr' ? 'de' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('ragetv_locale', nextLang);
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col shrink-0 h-screen sticky top-0 bg-surface-deep border-r border-surface-border transition-all duration-300 z-40 select-none',
        isCollapsed ? 'w-20 overflow-visible z-50' : 'w-[220px] tv:w-[280px]'
      )}
    >
      {/* Top Header / Logo */}
      <div
        className={cn(
          'flex border-b border-surface-border transition-all duration-200',
          isCollapsed
            ? 'flex-col items-center justify-center py-3 gap-2'
            : 'items-center justify-between h-16 px-4'
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src="/logos/rtv-logo.png"
            alt="RageTV"
            className="w-8 h-8 object-contain shrink-0"
          />
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-display font-extrabold text-base tracking-wider text-white">
                RAGE<span className="text-brand">TV</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                Esports Hub
              </span>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          title={isCollapsed ? 'Genişlet' : t('nav.collapse')}
          aria-label={isCollapsed ? 'Genişlet' : t('nav.collapse')}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Games Navigation List */}
      <div className={cn("flex-1 p-3 space-y-1.5", isCollapsed ? "overflow-visible" : "overflow-y-auto")}>
        <div className="px-2 py-1">
          {!isCollapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {t('games.title')}
            </span>
          )}
        </div>

        {GAMES_REGISTRY.map((game) => (
          <GameNavItem
            key={game.id}
            game={game}
            isCollapsed={isCollapsed}
            isLive={liveSlugs.includes(game.slug)}
          />
        ))}
      </div>

      {/* Bottom Controls / Language & Theme */}
      <div className="p-3 border-t border-surface-border space-y-1.5">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors',
            isCollapsed && 'justify-center'
          )}
          title={isLight ? 'Dark Mode' : 'Light Mode'}
        >
          {isLight ? (
            <Moon className="w-4 h-4 shrink-0 text-amber-400" />
          ) : (
            <Sun className="w-4 h-4 shrink-0 text-amber-400" />
          )}
          {!isCollapsed && (
            <span className="font-semibold">
              {isLight ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
        </button>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors',
            isCollapsed && 'justify-center'
          )}
          title={t('nav.language')}
        >
          <Globe className="w-4 h-4 shrink-0 text-brand" />
          {!isCollapsed && (
            <span className="uppercase font-semibold tracking-wider">
              {i18n.language.toUpperCase()}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
