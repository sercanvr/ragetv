import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PanelLeftClose, PanelLeft, Globe, Sun, Moon } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { GameTopPills } from '@/features/games/GameTopPills';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { GAMES_REGISTRY } from '@shared/registry/games';

interface AppShellProps {
  children: React.ReactNode;
  liveSlugs?: string[];
}

export const AppShell: React.FC<AppShellProps> = ({ children, liveSlugs = [] }) => {
  const { i18n } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    <div className="h-screen w-screen overflow-hidden p-2 sm:p-2.5 bg-neutral-900/90 dark:bg-[#0b0c10] text-foreground flex flex-col select-none antialiased">
      {/* Top Navbar — Arc Browser Style Top Navigation Bar */}
      <header className="h-11 shrink-0 px-2 sm:px-3 mb-2 flex items-center justify-between rounded-xl bg-surface-deep/80 backdrop-blur-md border border-surface-border/40 shadow-sm">
        {/* Left: Sidebar Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-1 focus:ring-brand"
            title={isCollapsed ? 'Kenar Çubuğunu Genişlet' : 'Kenar Çubuğunu Daralt'}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <div className="h-4 w-px bg-surface-border/60" />

          {/* Standalone Brand Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV"
              className="w-6 h-6 object-contain"
            />
            <span className="font-display font-extrabold text-sm tracking-wider text-foreground">
              RAGE<span className="text-brand">TV</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] text-muted-foreground uppercase font-semibold tracking-wider ml-1 px-2 py-0.5 rounded-md bg-foreground/5">
              Turnuvanın Kalbi
            </span>
          </div>
        </div>

        {/* Right: Language Switcher + Theme Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border/50"
            title="Dili Değiştir / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-brand" />
            <span className="uppercase">{i18n.language.toUpperCase()}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border/50"
            title={isLight ? 'Dark Mode’a Geç' : 'Light Mode’a Geç'}
            aria-label="Toggle Theme"
          >
            {isLight ? (
              <Moon className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>
        </div>
      </header>

      {/* Main Body: Sidebar + Rounded Canvas Canvas */}
      <div className="flex-1 flex gap-2 sm:gap-2.5 overflow-hidden min-h-0 relative">
        {/* Left Sidebar Frame */}
        <Sidebar
          liveSlugs={liveSlugs}
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((prev) => !prev)}
        />

        {/* Right Canvas: Framed & Scrollable */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex flex-col min-w-0 rounded-2xl bg-surface-base border border-surface-border/50 shadow-inner overflow-y-auto overflow-x-hidden relative"
        >
          {/* Mobile Game Pills */}
          <GameTopPills games={GAMES_REGISTRY} liveSlugs={liveSlugs} />

          {/* Main Stage Content */}
          <main className="flex-1 w-full max-w-[1700px] mx-auto p-3 sm:p-5 lg:p-6 pb-20 lg:pb-8">
            {children}
          </main>

          {/* Professional Footer */}
          <Footer />

          {/* Instant Scroll to Top Button */}
          <ScrollToTop targetRef={scrollContainerRef} />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
