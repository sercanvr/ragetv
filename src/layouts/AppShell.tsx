import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Sun,
  Moon,
  ChevronDown,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
  { code: 'tr', label: 'Turkish', short: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: '🇩🇪' },
] as const;

export const AppShell: React.FC<AppShellProps> = ({ children, liveSlugs = [] }) => {
  const { i18n, t } = useTranslation();
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

  const DEFAULT_LANGUAGE = LANGUAGES[1]; // English

  const currentLangObj =
    LANGUAGES.find((l) => l.code === (i18n.language?.slice(0, 2) || 'en')) ??
    DEFAULT_LANGUAGE;

  // Single-key Keyboard Shortcuts (T: Theater, K: Play/Pause, M: Mute, B: Sidebar)
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

      // T: Toggle Theater Mode (single key T)
      if (key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ragetv:toggle-theater'));
      }
      // K: Toggle Play / Pause (single key K)
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
    <div className="h-screen w-screen overflow-hidden p-0 m-0 bg-surface-deep text-foreground flex flex-col antialiased">
      {/* Top Navbar — Unified Roof Frame (Zero Margin/Padding, Flush with Window Edge) */}
      <header className="h-14 shrink-0 px-4 flex items-center justify-between border-b border-surface-border bg-surface-deep z-50">
        {/* Left: Standalone Big Brand Logo (Fixed, completely unaffected by sidebar toggle) */}
        <div className="flex items-center shrink-0 px-2 py-1">
          <div
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer hover:opacity-75 active:opacity-50 transition-none"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-sm"
            />
          </div>
        </div>

        {/* Right: Language Dropdown + Instant Direct Theme Toggle (Shifted slightly left with mr-3 sm:mr-5) */}
        <div className="flex items-center gap-2 sm:gap-3 mr-3 sm:mr-5">
          {/* 1. Language Dropdown Menu (High Z-Index) */}
          <div className="relative group/lang" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
              aria-haspopup="true"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#D84040]" />
              <span className="uppercase tracking-wider font-mono">{currentLangObj.short}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5 opacity-70" />
            </button>

            {/* User Requested Image 4 Tooltip (Hidden when dropdown is open) */}
            {!isLangOpen && (
              <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[9999] pointer-events-none opacity-0 group-hover/lang:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                <div className="relative bg-[#ccff00] text-black font-bold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center justify-center">
                  {t('tooltips.changeLanguage') || 'Dili Değiştir'}
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-[#ccff00]" />
                </div>
              </div>
            )}

            {/* Language Menu Items (Image 2 style: Flags, active with rounded border in brand red #D84040) */}
            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-surface-deep border border-surface-border shadow-2xl p-1.5 z-[9999] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 space-y-1">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLangObj.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all',
                        isSelected
                          ? 'border border-[#D84040]/50 bg-[#D84040]/10 text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-transparent'
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#D84040]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Direct Instant Theme Switcher with Image 4 Tooltip */}
          <div className="relative group/theme">
            <button
              onClick={() => selectTheme(isLight ? 'dark' : 'light')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
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

            {/* Image 4 Tooltip */}
            <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[9999] pointer-events-none opacity-0 group-hover/theme:opacity-100 transition-opacity duration-150 whitespace-nowrap">
              <div className="relative bg-[#ccff00] text-black font-bold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center justify-center">
                {t('tooltips.changeTheme') || 'Tema Değiştir'}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-[#ccff00]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body: Fixed Left Sidebar + Framed Window Content Canvas (Paint Drawing Architecture) */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-surface-deep relative">
        {/* Left Sidebar: Seamless Wall of the Frame, flush with top/bottom (sliding door effect) */}
        <Sidebar
          liveSlugs={liveSlugs}
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
        />

        {/* Right Area: Window Canvas Framed inside Architecture (Image 5 Mockup) */}
        <div className="flex-1 min-w-0 h-full p-2 sm:p-2.5 overflow-hidden flex flex-col">
          {/* THE ONLY SCROLLABLE AREA: Encased Window Pane with rounded-2xl/3xl and border */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex flex-col min-w-0 rounded-2xl sm:rounded-3xl bg-surface-base border border-surface-border shadow-2xl overflow-y-auto overflow-x-hidden relative"
          >
            {/* Mobile Game Top Pills (for mobile viewport only) */}
            <GameTopPills games={GAMES_REGISTRY} liveSlugs={liveSlugs} />

            {/* Main Stage Content (Extra bottom padding before footer as requested) */}
            <main className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-7 pb-24 sm:pb-36">
              {children}
            </main>

            {/* Professional Esports Legal Footer */}
            <Footer />

            {/* Instant Scroll to Top Button */}
            <ScrollToTop targetRef={scrollContainerRef} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};
