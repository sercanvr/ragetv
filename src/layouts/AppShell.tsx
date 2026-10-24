import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  const externalScrollRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

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

  // Observe content height for exact proportional external scrollbar track
  useEffect(() => {
    const updateHeight = () => {
      if (scrollContainerRef.current) {
        setContentHeight(scrollContainerRef.current.scrollHeight);
      }
    };
    updateHeight();

    if (typeof ResizeObserver !== 'undefined' && scrollContainerRef.current) {
      const ro = new ResizeObserver(updateHeight);
      ro.observe(scrollContainerRef.current);
      return () => ro.disconnect();
    }
  }, []);

  // Synchronize internal card scroll with the extreme-right native scrollbar
  useEffect(() => {
    const inner = scrollContainerRef.current;
    const outer = externalScrollRef.current;
    if (!inner || !outer) return;

    let isSyncingInner = false;
    let isSyncingOuter = false;

    const handleInnerScroll = () => {
      if (isSyncingInner) {
        isSyncingInner = false;
        return;
      }
      isSyncingOuter = true;
      outer.scrollTop = inner.scrollTop;
    };

    const handleOuterScroll = () => {
      if (isSyncingOuter) {
        isSyncingOuter = false;
        return;
      }
      isSyncingInner = true;
      inner.scrollTop = outer.scrollTop;
    };

    inner.addEventListener('scroll', handleInnerScroll, { passive: true });
    outer.addEventListener('scroll', handleOuterScroll, { passive: true });

    return () => {
      inner.removeEventListener('scroll', handleInnerScroll);
      outer.removeEventListener('scroll', handleOuterScroll);
    };
  }, []);

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
      {/* Top Navbar — Unified Roof Frame (Seamlessly connected with sidebar as single frame) */}
      <header className="h-14 shrink-0 px-4 flex items-center justify-between bg-surface-deep z-50 shadow-none">
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
              className="h-8 px-2.5 flex items-center gap-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
              aria-haspopup="true"
              aria-expanded={isLangOpen}
            >
              <i className="fa-solid fa-earth-americas text-xs text-[#D84040]" aria-hidden="true" />
              <span className="uppercase tracking-wider font-mono">{currentLangObj.short}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5 opacity-70" />
            </button>

            {/* User Requested Tooltip with Brand Accent #D84040 */}
            {!isLangOpen && (
              <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[9999] pointer-events-none opacity-0 group-hover/lang:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                <div className="relative bg-[#D84040] text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center justify-center">
                  {t('tooltips.changeLanguage') || 'Dili Değiştir'}
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-[#D84040]" />
                </div>
              </div>
            )}

            {/* Language Menu Items (Compact, Language Names only, left-aligned, tight checkmark spacing, light-gray hover) */}
            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-auto min-w-[100px] rounded-xl bg-surface-deep border border-surface-border shadow-2xl p-1 z-[9999] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 space-y-0.5">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLangObj.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={cn(
                        'w-full flex items-center justify-start text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors gap-2',
                        isSelected
                          ? 'border border-[#D84040]/50 bg-[#D84040]/10 text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 border border-transparent'
                      )}
                    >
                      <span className="truncate">{lang.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D84040] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Direct Instant Theme Switcher with matching h-8 w-8 height */}
          <div className="relative group/theme">
            <button
              onClick={() => selectTheme(isLight ? 'dark' : 'light')}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border border-surface-border"
              aria-label="Toggle Theme"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-foreground"
                aria-hidden="true"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* Tooltip with Brand Accent #D84040 */}
            <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[9999] pointer-events-none opacity-0 group-hover/theme:opacity-100 transition-opacity duration-150 whitespace-nowrap">
              <div className="relative bg-[#D84040] text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center justify-center">
                {t('tooltips.changeTheme') || 'Tema Değiştir'}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-[#D84040]" />
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

        {/* Right Area: Fixed Outer Container with Isolated Native Scrollbar at the Extreme Screen Edge */}
        <div className="flex-1 min-w-0 h-full min-h-0 flex pl-0.5 relative">
          {/* Framed Window Pane Canvas: Permanent Fixed Bezel at Top and Bottom, unclipped rounded-3xl corners */}
          <div className="right-content-frame flex-1 min-w-0 h-full min-h-0 flex flex-col rounded-2xl sm:rounded-3xl bg-surface-base border border-neutral-300/80 dark:border-white/[0.14] overflow-hidden relative shadow-none mr-2 sm:mr-3 mb-4 sm:mb-5 lg:mb-6">
            {/* Scrollable Viewport inside the frame: Content scrolls smoothly without any inner scrollbar touching the radius */}
            <div
              ref={scrollContainerRef}
              className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Mobile Game Top Pills (for mobile viewport only) */}
              <GameTopPills games={GAMES_REGISTRY} liveSlugs={liveSlugs} />

              {/* Main Stage Content */}
              <main className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-7 pb-20 sm:pb-28">
                {children}
              </main>

              {/* Professional Esports Legal Footer */}
              <Footer />

              {/* Instant Scroll to Top Button */}
              <ScrollToTop targetRef={scrollContainerRef} />
            </div>
          </div>

          {/* Dedicated External Scrollbar Channel: Flush to the Window's Far Right Edge, completely detached from the card frame */}
          <div
            ref={externalScrollRef}
            className="w-2 h-full overflow-y-auto overflow-x-hidden shrink-0 mr-0.5 mb-4 sm:mb-5 lg:mb-6"
            style={{ overscrollBehavior: 'contain' }}
            aria-hidden="true"
          >
            <div style={{ height: `${contentHeight}px`, width: '1px' }} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};
