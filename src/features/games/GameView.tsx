import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getGameBySlug, getDefaultGame } from '@shared/registry/games';
import { PlayerStage } from '@/features/player/PlayerStage';

export const GameView: React.FC = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();

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

  // Active stream currently null in M1 skeleton; M2 connects live Twitch Helix adapter
  return <PlayerStage game={game} activeStream={null} />;
};
