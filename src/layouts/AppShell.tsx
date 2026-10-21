import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PanelLeftClose,
  PanelLeft,
  Globe,
  Sun,
  Moon,
  ChevronDown,
  Check,
} from 'lucide-react';
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

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
];

export const AppShell: React.FC<AppShellProps> = ({ children, liveSlugs = [] }) => {
  const { i18n } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. Sidebar Collapsed State (Default: Open / false, persisted in localStorage)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ragetv_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('ragetv_sidebar_collapsed', String(next));
      return next;
    });
  };

  // 2. Theme State (Default: Dark, persisted in localStorage)
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ragetv_theme') === 'light';
    }
    return false;
  });

  // Dropdown States
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTheme = (theme: 'dark' | 'light') => {
    const isLightMode = theme === 'light';
    setIsLight(isLightMode);
    if (isLightMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ragetv_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('ragetv_theme', 'dark');
    }
    setIsThemeOpen(false);
  };

  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('ragetv_locale', code);
    setIsLangOpen(false);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  const currentLangObj =
    LANGUAGES.find((l) => l.code === (i18n.language?.slice(0, 2) || 'en')) ||
    LANGUAGES[0];

  return (
    <div className="h-screen w-screen overflow-hidden p-2 sm:p-2.5 bg-[#0D0D0D] dark:bg-[#0D0D0D] light:bg-[#F5EFE6] text-foreground flex flex-col select-none antialiased">
      {/* Top Navbar — Pardus / Arc Browser Integrated Top Frame Bar */}
      <header className="h-12 shrink-0 px-3 mb-2 flex items-center justify-between rounded-xl bg-surface-deep/90 backdrop-blur-md border border-surface-border shadow-sm">
        {/* Left: Sidebar Toggle + Brand Logo (Click to refresh) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#D84040]"
            title={isCollapsed ? 'Kenar Çubuğunu Aç' : 'Kenar Çubuğunu Daralt'}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <div className="h-4 w-px bg-surface-border" />

          {/* Standalone Brand Logo: Instant Opacity Drop on Hover, Refresh on Click */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-75 active:opacity-50 transition-none select-none"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="font-display font-extrabold text-base tracking-wider text-foreground">
              RAGE<span className="text-[#D84040]">TV</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] text-muted-foreground uppercase font-semibold tracking-widest ml-1 px-2 py-0.5 rounded-md bg-foreground/5 border border-surface-border/50">
              Turnuvanın Kalbi
            </span>
          </div>
        </div>

        {/* Right: Language Dropdown + Theme Dropdown (Zero Search Bar) */}
        <div className="flex items-center gap-2">
          {/* 1. Language Dropdown Menu */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                setIsLangOpen((prev) => !prev);
                setIsThemeOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
              title="Dili Değiştir / Select Language"
              aria-haspopup="true"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#D84040]" />
              <span className="uppercase tracking-wider">{currentLangObj.short}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5 opacity-70" />
            </button>

            {/* Language Menu Items */}
            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-surface-deep border border-surface-border shadow-2xl p-1 z-[9999] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLangObj.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <span>{lang.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D84040]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Theme Dropdown Menu */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => {
                setIsThemeOpen((prev) => !prev);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
              title="Tema Değiştir / Select Theme"
              aria-haspopup="true"
              aria-expanded={isThemeOpen}
            >
              {isLight ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span className="hidden sm:inline text-xs font-medium">
                {isLight ? 'Light' : 'Dark'}
              </span>
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5 opacity-70" />
            </button>

            {/* Theme Menu Items */}
            {isThemeOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-surface-deep border border-surface-border shadow-2xl p-1 z-[9999] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => selectTheme('dark')}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-amber-400" />
                    Dark Mode
                  </span>
                  {!isLight && <Check className="w-3.5 h-3.5 text-[#D84040]" />}
                </button>
                <button
                  onClick={() => selectTheme('light')}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    Light Mode
                  </span>
                  {isLight && <Check className="w-3.5 h-3.5 text-[#D84040]" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body: Fixed Left Sidebar + Scrollable Right Content (Pardus / Frame Model) */}
      <div className="flex-1 flex gap-2 sm:gap-2.5 overflow-hidden min-h-0 relative">
        {/* Left Sidebar: Fixed structure, collapsible */}
        <Sidebar
          liveSlugs={liveSlugs}
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
        />

        {/* Right Content Area: THE ONLY SCROLLABLE AREA IN THE ENTIRE APPLICATION */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex flex-col min-w-0 rounded-2xl bg-surface-base border border-surface-border shadow-inner overflow-y-auto overflow-x-hidden relative"
        >
          {/* Mobile Game Top Pills (for mobile viewport only) */}
          <GameTopPills games={GAMES_REGISTRY} liveSlugs={liveSlugs} />

          {/* Main Stage Content */}
          <main className="flex-1 w-full max-w-[1700px] mx-auto p-3 sm:p-5 lg:p-6 pb-20 lg:pb-8">
            {children}
          </main>

          {/* Professional Esports Legal Footer */}
          <Footer />

          {/* Instant Scroll to Top Button (no animation, instant behavior) */}
          <ScrollToTop targetRef={scrollContainerRef} />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};
