import React from 'react';
import { Sidebar } from './Sidebar';
import { GameTopPills } from '@/features/games/GameTopPills';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';
import { GAMES_REGISTRY } from '@shared/registry/games';

interface AppShellProps {
  children: React.ReactNode;
  liveSlugs?: string[];
}

export const AppShell: React.FC<AppShellProps> = ({ children, liveSlugs = [] }) => {
  return (
    <div className="min-h-screen bg-surface-base text-gray-100 flex flex-col lg:flex-row antialiased">
      {/* Desktop / Television Left Sidebar */}
      <Sidebar liveSlugs={liveSlugs} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        {/* Mobile Sticky Game Filter Bar */}
        <GameTopPills games={GAMES_REGISTRY} liveSlugs={liveSlugs} />

        {/* Dynamic Stage View */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Global Legal Footer */}
        <Footer />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};
