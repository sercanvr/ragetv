import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { useFixtures } from './useFixtures';
import { FixtureCard } from './FixtureCard';
import { MatchCountdown } from './MatchCountdown';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface FixturesSectionProps {
  gameSlug: string;
}

export const FixturesSection: React.FC<FixturesSectionProps> = ({ gameSlug }) => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const { data, isLoading } = useFixtures(gameSlug);

  const upcomingMatches = data?.upcoming || [];
  const resultMatches = data?.results || [];
  const nextMatch = upcomingMatches[0];

  return (
    <section className="mt-8 space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all select-none',
              activeTab === 'upcoming'
                ? 'bg-brand/15 text-brand border border-brand/30 shadow-brand-glow'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Fixtures</span>
            {upcomingMatches.length > 0 && (
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-surface-panel text-gray-300">
                {upcomingMatches.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all select-none',
              activeTab === 'results'
                ? 'bg-brand/15 text-brand border border-brand/30 shadow-brand-glow'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Recent Results</span>
          </button>
        </div>

        {/* Next Match Countdown (Referans Görsel 3) */}
        {activeTab === 'upcoming' && nextMatch && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline">Next Match in:</span>
            <MatchCountdown targetDate={nextMatch.scheduledAt} />
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      )}

      {/* Match Cards Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeTab === 'upcoming' ? (
            upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <FixtureCard key={match.id} match={match} locale={i18n.language} />
              ))
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center col-span-2">
                No upcoming scheduled tournament matches found for this title.
              </p>
            )
          ) : resultMatches.length > 0 ? (
            resultMatches.map((match) => (
              <FixtureCard key={match.id} match={match} locale={i18n.language} />
            ))
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center col-span-2">
              No recent tournament results found.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
