import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { useFixtures } from './useFixtures';
import { FixtureCard } from './FixtureCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { PopButton } from '@/components/ui/PopButton';

interface FixturesSectionProps {
  gameSlug: string;
}

export const FixturesSection: React.FC<FixturesSectionProps> = ({ gameSlug }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const { data, isLoading } = useFixtures(gameSlug);

  const upcomingMatches = data?.upcoming || [];
  const resultMatches = data?.results || [];

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-4 w-full">
      {/* Panel Title & Tabs */}
      <div className="space-y-3 border-b border-surface-border pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            {t('fixtures.title') || 'Turnuva Fikstürü & Sonuçlar'}
          </h2>
        </div>

        {/* Tab Buttons using PopButton */}
        <div className="flex items-center gap-2 pt-0.5">
          <PopButton
            onClick={() => setActiveTab('upcoming')}
            size="sm"
            color={activeTab === 'upcoming' ? 'red' : 'default'}
            className="flex-1 h-8 gap-1.5 text-xs font-semibold"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('fixtures.upcoming') || 'Yaklaşan'}</span>
            {upcomingMatches.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white ml-1">
                {upcomingMatches.length}
              </span>
            )}
          </PopButton>

          <PopButton
            onClick={() => setActiveTab('results')}
            size="sm"
            color={activeTab === 'results' ? 'red' : 'default'}
            className="flex-1 h-8 gap-1.5 text-xs font-semibold"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('fixtures.results') || 'Sonuçlar'}</span>
            {resultMatches.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white ml-1">
                {resultMatches.length}
              </span>
            )}
          </PopButton>
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
                {t('fixtures.noUpcoming') || 'Bu oyun için planlanmış turnuva maçı bulunamadı.'}
              </p>
            )
          ) : resultMatches.length > 0 ? (
            resultMatches.map((match) => (
              <FixtureCard key={match.id} match={match} locale={i18n.language} />
            ))
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">
              {t('fixtures.noResults') || 'Yakın zamanda tamamlanan turnuva sonucu bulunamadı.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
