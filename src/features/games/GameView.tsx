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
import { PopButton } from '@/components/ui/PopButton';
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
      {/* Tab Switcher Header using PopButton */}
      <div className="flex items-center gap-2">
        <PopButton
          onClick={() => setActiveTab('fixtures')}
          size="sm"
          color={activeTab === 'fixtures' ? 'red' : 'default'}
          className="flex-1 h-9 gap-2 text-xs font-semibold"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Turnuva Fikstürü</span>
        </PopButton>

        <PopButton
          onClick={() => setActiveTab('leaderboard')}
          size="sm"
          color={activeTab === 'leaderboard' ? 'red' : 'default'}
          className="flex-1 h-9 gap-2 text-xs font-semibold"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Takım Sıralaması</span>
        </PopButton>
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
      {/* Top Section: Player Stage + Side Panel with Ultra-Smooth Cubic-Bezier Transitions */}
      <div className="w-full flex flex-col 2xl:flex-row gap-6 items-start justify-center">
        {/* Main Screen Stage: Smoothly centers and scales with zero frame jump */}
        <div
          className={cn(
            'min-w-0 w-full flex-1 space-y-6 transition-[max-width,margin] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
            isTheaterMode
              ? 'max-w-[calc((100vh-230px)*16/9)] mx-auto'
              : 'max-w-full mx-0'
          )}
        >
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

        {/* Side Panel: Smoothly expands/collapses width & opacity symmetrically without squishing children */}
        <div
          className={cn(
            'shrink-0 overflow-hidden transition-[width,opacity,margin] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
            isTheaterMode
              ? 'hidden 2xl:block 2xl:w-0 2xl:opacity-0 2xl:pointer-events-none 2xl:m-0'
              : 'w-full 2xl:w-[440px] opacity-100'
          )}
        >
          <div className="w-full 2xl:w-[440px]">
            {renderSidePanel()}
          </div>
        </div>
      </div>

      {/* In Theater Mode: Side Panel Flows Below Champions Centered with smooth height/opacity transition */}
      <div
        className={cn(
          'w-full max-w-4xl mx-auto pt-2 transition-all duration-300 ease-in-out overflow-hidden',
          isTheaterMode ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        {renderSidePanel()}
      </div>
    </div>
  );
};
