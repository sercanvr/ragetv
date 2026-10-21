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

  // Dropdown States (Language only)
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
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
  };

  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('ragetv_locale', code);
    setIsLangOpen(false);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  const DEFAULT_LANGUAGE = { code: 'en', label: 'English', short: 'EN' } as const;

  const currentLangObj =
    LANGUAGES.find((l) => l.code === (i18n.language?.slice(0, 2) || 'en')) ??
    DEFAULT_LANGUAGE;

  // Single-key Keyboard Shortcuts (T: Theater, K: Play/Pause, M: Mute, B / Ctrl+B: Sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // T: Toggle Theater Mode (as requested: single key T)
      if (key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ragetv:toggle-theater'));
      }
      // K: Toggle Play / Pause (as requested: single key K)
      else if (key === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ragetv:toggle-playback'));
      }
      // M: Toggle Audio Mute (single key M)
      else if (key === 'm' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ragetv:toggle-mute'));
      }
      // B or Ctrl+B: Toggle Left Sidebar
      else if (key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden p-0 m-0 bg-surface-deep text-foreground flex flex-col select-none antialiased">
      {/* Top Navbar — Unified Roof Frame (Zero Margin/Padding, Flush with Window Edge) */}
      <header className="h-14 shrink-0 px-4 flex items-center justify-between border-b border-surface-border bg-surface-deep z-50">
        {/* Left: Sidebar Toggle + Standalone Big Logo (NO text, click to refresh) */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#D84040]"
            title={isCollapsed ? 'Kenar Çubuğunu Aç (B)' : 'Kenar Çubuğunu Daralt (B)'}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>

          <div className="h-5 w-px bg-surface-border" />

          {/* Standalone Big Brand Logo Only (No text, as requested in Item 1) */}
          <div
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer hover:opacity-75 active:opacity-50 transition-none select-none py-1"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-sm"
            />
          </div>
        </div>

        {/* Right: Language Dropdown + Instant Direct Theme Toggle (NO theme dropdown) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1. Language Dropdown Menu (High Z-Index) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
              title="Dili Değiştir / Select Language"
              aria-haspopup="true"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#D84040]" />
              <span className="uppercase tracking-wider font-mono">{currentLangObj.short}</span>
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

          {/* 2. Direct Instant Theme Switcher (NO dropdown, immediate toggle on click) */}
          <button
            onClick={() => selectTheme(isLight ? 'dark' : 'light')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
            title={isLight ? 'Dark Mode’a Geç' : 'Light Mode’a Geç'}
            aria-label="Toggle Theme"
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden sm:inline font-mono text-xs">
              {isLight ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Body: Fixed Left Sidebar + Framed Inner-Radius Content Canvas (Paint Drawing Architecture) */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-surface-deep relative">
        {/* Left Sidebar: Seamless Wall of the Frame, flush with top/bottom (sliding door effect) */}
        <Sidebar
          liveSlugs={liveSlugs}
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
        />

        {/* Right Area Wrapper: Provides breathing room for inner-only radius content card */}
        <div className="flex-1 min-w-0 h-full p-2.5 sm:p-3 overflow-hidden flex flex-col">
          {/* THE ONLY SCROLLABLE AREA: Inner-radius only card canvas (as requested in Paint drawing) */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex flex-col min-w-0 rounded-2xl sm:rounded-3xl bg-surface-base border border-surface-border shadow-inner overflow-y-auto overflow-x-hidden relative"
          >
            {/* Mobile Game Top Pills (for mobile viewport only) */}
            <GameTopPills games={GAMES_REGISTRY} liveSlugs={liveSlugs} />

            {/* Main Stage Content */}
            <main className="flex-1 w-full max-w-[1700px] mx-auto p-3 sm:p-5 lg:p-6 pb-16">
              {children}
            </main>

            {/* Professional Esports Legal Footer */}
            <Footer />

            {/* Instant Scroll to Top Button (instant behavior) */}
            <ScrollToTop targetRef={scrollContainerRef} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};
