import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from '@/layouts/AppShell';
import { GameView } from '@/features/games/GameView';
import { useLiveStatus } from '@/features/live/useLiveStatus';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: true,
      retry: 2,
    },
  },
});

const AppContent: React.FC = () => {
  const { data } = useLiveStatus();
  const savedGame =
    typeof window !== 'undefined'
      ? localStorage.getItem('ragetv_last_game') || 'cs2'
      : 'cs2';

  // Extract slugs of games that currently have active live streams
  const liveSlugs = Object.entries(data?.games || {})
    .filter(([_, gameData]) => gameData.live && gameData.live.length > 0)
    .map(([slug]) => slug);

  return (
    <AppShell liveSlugs={liveSlugs}>
      <Routes>
        <Route path="/" element={<Navigate to={`/${savedGame}`} replace />} />
        <Route path="/:gameSlug" element={<GameView />} />
        <Route path="*" element={<Navigate to="/cs2" replace />} />
      </Routes>
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
