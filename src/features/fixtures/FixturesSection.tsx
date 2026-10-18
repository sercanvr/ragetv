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
    <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-4 w-full">
      {/* Panel Title & Tabs */}
      <div className="space-y-3 border-b border-surface-border pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            Turnuva Fikstürü & Sonuçlar
          </h2>
        </div>

        {/* Next Match Countdown (Referans Görsel 3) */}
        {activeTab === 'upcoming' && nextMatch && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-card border border-surface-border">
            <span className="text-xs text-gray-400 font-medium">Sıradaki Maç:</span>
            <MatchCountdown targetDate={nextMatch.scheduledAt} />
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-deep border border-surface-border">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none',
              activeTab === 'upcoming'
                ? 'bg-brand text-white shadow-brand-glow'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Yaklaşan</span>
            {upcomingMatches.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white">
                {upcomingMatches.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none',
              activeTab === 'results'
                ? 'bg-brand text-white shadow-brand-glow'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sonuçlar</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      )}

      {/* Match Cards Vertical List */}
      {!isLoading && (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {activeTab === 'upcoming' ? (
            upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <FixtureCard key={match.id} match={match} locale={i18n.language} />
              ))
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center">
                Bu oyun için planlanmış turnuva maçı bulunamadı.
              </p>
            )
          ) : resultMatches.length > 0 ? (
            resultMatches.map((match) => (
              <FixtureCard key={match.id} match={match} locale={i18n.language} />
            ))
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">
              Yakın zamanda tamamlanan turnuva sonucu bulunamadı.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
