import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from '@/layouts/AppShell';
import { GameView } from '@/features/games/GameView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: true,
      retry: 2,
    },
  },
});

export const App: React.FC = () => {
  // Check user's previously viewed game or fallback to cs2
  const savedGame =
    typeof window !== 'undefined'
      ? localStorage.getItem('ragetv_last_game') || 'cs2'
      : 'cs2';

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to={`/${savedGame}`} replace />} />
            <Route path="/:gameSlug" element={<GameView />} />
            <Route path="*" element={<Navigate to="/cs2" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
