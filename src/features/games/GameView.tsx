import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Trophy } from 'lucide-react';
import { getGameBySlug, getDefaultGame } from '@shared/registry/games';
import { selectPrimaryStream } from '@shared/streamSelection';
import { useTranslation } from 'react-i18next';
import { PlayerStage } from '@/features/player/PlayerStage';
import { FixturesSection } from '@/features/fixtures/FixturesSection';
import { TeamLeaderboard } from '@/features/leaderboard/TeamLeaderboard';
import { useLiveStatus } from '@/features/live/useLiveStatus';
import { cn } from '@/lib/utils';
import { HistoricalChampions } from '@/features/champions/HistoricalChampions';

export const GameView: React.FC = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { data } = useLiveStatus();
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'fixtures' | 'leaderboard'>('fixtures');
  const [isTheaterMode, setIsTheaterMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ragetv_theater_mode') === 'true';
    }
    return false;
  });

  // If no slug or invalid slug, fallback to default or redirect
  const game = gameSlug ? getGameBySlug(gameSlug) : getDefaultGame();

  useEffect(() => {
    if (game) {
      localStorage.setItem('ragetv_last_game', game.slug);
      document.title = `${game.name} — RageTV | Turnuvanın Kalbi`;
    }
  }, [game]);

  // Listen to Ctrl+T theater mode toggle
  useEffect(() => {
    const handleToggleTheater = () => {
      setIsTheaterMode((prev) => {
        const next = !prev;
        localStorage.setItem('ragetv_theater_mode', String(next));
        return next;
      });
    };

    window.addEventListener('ragetv:toggle-theater', handleToggleTheater);
    return () => window.removeEventListener('ragetv:toggle-theater', handleToggleTheater);
  }, []);

  if (!game) {
    return <Navigate to="/cs2" replace />;
  }

  // Get primary live stream using pure domain selection hierarchy
  const gameLiveStreams = data?.games[game.slug]?.live || [];
  const activeStream = selectPrimaryStream(gameLiveStreams, {
    preferredLanguage: i18n.language,
  });

  const toggleTheater = () => {
    setIsTheaterMode((prev) => {
      const next = !prev;
      localStorage.setItem('ragetv_theater_mode', String(next));
      return next;
    });
  };

  const renderSidePanel = () => (
    <div className="space-y-3 w-full">
      {/* Tab Switcher Header */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-deep/90 border border-surface-border/60 shadow-sm backdrop-blur-md">
        <button
          onClick={() => setActiveTab('fixtures')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200',
            activeTab === 'fixtures'
              ? 'bg-brand text-white shadow-md shadow-brand/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
          )}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Turnuva Fikstürü</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200',
            activeTab === 'leaderboard'
              ? 'bg-brand text-white shadow-md shadow-brand/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
          )}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Takım Sıralaması</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'fixtures' ? (
        <FixturesSection gameSlug={game.slug} />
      ) : (
        <TeamLeaderboard gameSlug={game.slug} />
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Section: Player Stage + Side Panel with Symmetrical 300ms Transitions */}
      <div className="w-full flex flex-col 2xl:flex-row gap-5 items-start">
        {/* Main Screen Stage: Stable flex-1 without width snapping */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          <PlayerStage
            key={game.slug}
            game={game}
            activeStream={activeStream || null}
            isTheaterMode={isTheaterMode}
            onToggleTheater={toggleTheater}
          />

          {/* Historical Champions remains stable under player in both modes */}
          <HistoricalChampions gameSlug={game.slug} />
        </div>

        {/* Side Panel: Smoothly expands/collapses width & opacity symmetrically */}
        <div
          className={cn(
            'shrink-0 transition-all duration-300 ease-in-out overflow-hidden',
            isTheaterMode
              ? 'hidden 2xl:block 2xl:w-0 2xl:opacity-0 2xl:pointer-events-none'
              : 'w-full 2xl:w-[440px] opacity-100'
          )}
        >
          {renderSidePanel()}
        </div>
      </div>

      {/* In Theater Mode: Side Panel Flows Below Champions Centered */}
      {isTheaterMode && (
        <div className="w-full max-w-4xl mx-auto pt-2 animate-in fade-in duration-300">
          {renderSidePanel()}
        </div>
      )}
    </div>
  );
};
