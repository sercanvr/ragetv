import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronDown,
  Check,
  Menu,
  X,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
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
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Instant Scroll-to-Top on Game/Route Change or Language Change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (externalScrollRef.current) {
      externalScrollRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, i18n.language]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Observe content height for exact proportional external scrollbar track
  useEffect(() => {
    const updateHeight = () => {
      if (contentInnerRef.current) {
        setContentHeight(contentInnerRef.current.scrollHeight);
      } else if (scrollContainerRef.current) {
        setContentHeight(scrollContainerRef.current.scrollHeight);
      }
    };
    updateHeight();

    if (typeof ResizeObserver !== 'undefined' && contentInnerRef.current) {
      const ro = new ResizeObserver(updateHeight);
      ro.observe(contentInnerRef.current);
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
      if (window.innerWidth < 1024 || !outer.clientHeight) return;
      if (isSyncingInner) {
        isSyncingInner = false;
        return;
      }
      isSyncingOuter = true;
      outer.scrollTop = inner.scrollTop;
    };

    const handleOuterScroll = () => {
      if (window.innerWidth < 1024 || !outer.clientHeight) return;
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
    document.documentElement.classList.add('disable-transitions');
    if (isLightMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ragetv_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('ragetv_theme', 'dark');
    }
    // Force reflow and restore transitions
    void document.documentElement.offsetHeight;
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('disable-transitions');
    });
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
      <header className="h-14 shrink-0 pl-1.5 pr-3 sm:pl-2 sm:pr-4 flex items-center justify-between bg-surface-deep z-50 shadow-none relative">
        {/* Left: Desktop Sidebar Toggle (Kick style) + Standalone Brand Logo (Flush with Sidebar) */}
        <div className="flex items-center shrink-0 pl-0 pr-2 py-1">
          {/* Desktop Sidebar Toggle Button to the left of the Logo (Transparent by default, border and bg on hover) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center p-2 rounded-xl text-foreground/85 hover:text-foreground bg-transparent border border-transparent hover:border-surface-border hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all duration-150 cursor-pointer mr-2"
            title={isCollapsed ? 'Kenar Çubuğunu Aç (B)' : 'Kenar Çubuğunu Daralt (B)'}
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Brand Logo with Sharp Black Shadow */}
          <div
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer hover:opacity-85 active:opacity-60 transition-opacity"
            title="RageTV — Sayfayı Yenile"
          >
            <img
              src="/logos/rtv-logo.png"
              alt="RageTV"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.85)] drop-shadow-[0_1px_1px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* Right (Desktop): Language Dropdown + Instant Direct Theme Toggle */}
        <div className="hidden lg:flex items-center gap-1 mr-3 sm:mr-5">
          {/* 1. Language Dropdown Menu (High Z-Index) */}
          <div className="relative group/lang" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="h-8 px-1.5 py-1 flex items-center gap-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border-[1.5px] border-neutral-400/90 dark:border-white/30"
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
              <div className="absolute right-0 mt-1.5 w-auto min-w-[100px] rounded-xl bg-surface-deep border-[1.5px] border-neutral-400/90 dark:border-white/30 shadow-2xl p-1 z-[9999] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 space-y-0.5">
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
              className="h-8 w-8 flex items-center justify-center rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors border-[1.5px] border-neutral-400/90 dark:border-white/30"
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

        {/* Right (Mobile): Hamburger Button (Three lines in rounded box) */}
        <div className="lg:hidden flex items-center mr-1">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl border border-neutral-400/50 dark:border-white/20 bg-surface-deep text-foreground hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle Mobile Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu (Solid non-blurred background, auto-closes on selection, locks body scroll) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-14 z-[100] bg-surface-deep border-t border-surface-border p-5 overflow-y-auto flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* 1. Games List */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 px-1">
                {t('games.title') || 'Oyunlar'}
              </span>
              <div className="flex flex-col gap-1">
                {GAMES_REGISTRY.map((game) => {
                  const isLive = liveSlugs.includes(game.slug);
                  return (
                    <NavLink
                      key={game.id}
                      to={`/${game.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-[#D84040]/15 text-[#D84040] font-semibold border border-[#D84040]/40'
                            : 'text-foreground hover:bg-white/5 border border-transparent'
                        )
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        {game.logoUrl && (
                          <img src={game.logoUrl} alt="" className="w-5 h-5 object-contain" />
                        )}
                        <span>{game.name}</span>
                      </div>
                      {isLive && (
                        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D84040] text-white animate-pulse">
                          {t('player.live') || 'CANLI'}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] w-full bg-surface-border/60" />

            {/* 2. Language Selection (Vertical List with Full Names: Turkish, English, Deutsch) */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 px-1">
                {t('tooltips.changeLanguage') || 'Dili Değiştir'}
              </span>
              <div className="flex flex-col gap-1.5">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLangObj.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        selectLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-between',
                        isSelected
                          ? 'border-[#D84040] bg-[#D84040]/15 text-foreground'
                          : 'border-surface-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#D84040]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] w-full bg-surface-border/60" />

            {/* 3. Theme Toggle (Vertical Two Buttons: Koyu Tema, Açık Tema) */}
            <div className="flex flex-col gap-2 pb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 px-1">
                {t('tooltips.changeTheme') || 'Tema Seçimi'}
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    selectTheme('dark');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-between',
                    !isLight
                      ? 'border-[#D84040] bg-[#D84040]/15 text-foreground'
                      : 'border-surface-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-foreground"
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
                    Koyu Tema
                  </span>
                  {!isLight && <Check className="w-4 h-4 text-[#D84040]" />}
                </button>
                <button
                  onClick={() => {
                    selectTheme('light');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-between',
                    isLight
                      ? 'border-[#D84040] bg-[#D84040]/15 text-foreground'
                      : 'border-surface-border text-muted-foreground hover:text-foreground hover:bg-white/5'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-foreground"
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
                    Açık Tema
                  </span>
                  {isLight && <Check className="w-4 h-4 text-[#D84040]" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Body: Fixed Left Sidebar + Framed Window Content Canvas (Paint Drawing Architecture) */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-surface-deep relative">
        {/* Left Sidebar: Seamless Wall of the Frame, flush with top/bottom (sliding door effect) */}
        <Sidebar
          liveSlugs={liveSlugs}
          isCollapsed={isCollapsed}
        />

        {/* Right Area: Symmetrical Mobile Padding & Isolated Desktop Scrollbar */}
        <div className="flex-1 min-w-0 h-full min-h-0 flex px-2 sm:px-3 lg:px-0 lg:pl-0.5 pb-2.5 sm:pb-3.5 relative">
          {/* Framed Window Pane Canvas: Ambient Esports Arena Background, Thicker Defined Border, Breathing Room */}
          <div className="right-content-frame right-content-canvas flex-1 min-w-0 h-full min-h-0 flex flex-col rounded-2xl sm:rounded-3xl border-[1.5px] border-neutral-400/90 dark:border-white/[0.22] overflow-hidden relative shadow-none mr-0 lg:mr-2.5">
            {/* Scrollable Viewport inside the frame: Content scrolls smoothly without any inner scrollbar touching the radius */}
            <div
              ref={scrollContainerRef}
              className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar relative"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Inner content wrapper measured by ResizeObserver for 100% accurate height & mobile scrolling */}
              <div ref={contentInnerRef} className="w-full flex flex-col min-h-full pb-36 sm:pb-20">
                {/* Main Stage Content (Even padding on mobile without horizontal overflow) */}
                <main className="flex-1 w-full max-w-[1700px] mx-auto px-2.5 py-4 sm:p-6 lg:p-7 pb-12 sm:pb-16">
                  {children}
                </main>

                {/* Professional Esports Legal Footer */}
                <Footer />
              </div>

              {/* Instant Scroll to Top Button */}
              <ScrollToTop targetRef={scrollContainerRef} />
            </div>
          </div>

          {/* Dedicated External Scrollbar Channel: Desktop only, flush to the screen edge */}
          <div
            ref={externalScrollRef}
            className="hidden lg:block w-2 h-full overflow-y-auto overflow-x-hidden shrink-0 mr-0.5"
            style={{ overscrollBehavior: 'contain' }}
            aria-hidden="true"
          >
            <div style={{ height: `${contentHeight}px`, width: '1px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
