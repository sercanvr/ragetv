import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getGameBySlug, getDefaultGame } from '@shared/registry/games';
import { PlayerStage } from '@/features/player/PlayerStage';
import { FixturesSection } from '@/features/fixtures/FixturesSection';
import { useLiveStatus } from '@/features/live/useLiveStatus';

export const GameView: React.FC = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { data } = useLiveStatus();

  // If no slug or invalid slug, fallback to default or redirect
  const game = gameSlug ? getGameBySlug(gameSlug) : getDefaultGame();

  useEffect(() => {
    if (game) {
      localStorage.setItem('ragetv_last_game', game.slug);
      document.title = `${game.name} — RageTV Live Esports`;
    }
  }, [game]);

  if (!game) {
    return <Navigate to="/cs2" replace />;
  }

  // Get primary live stream if available for this game
  const gameLiveStreams = data?.games[game.slug]?.live || [];
  const activeStream = gameLiveStreams.length > 0 ? gameLiveStreams[0] : null;

  return (
    <div className="space-y-6">
      <PlayerStage game={game} activeStream={activeStream || null} />
      <FixturesSection gameSlug={game.slug} />
    </div>
  );
};
