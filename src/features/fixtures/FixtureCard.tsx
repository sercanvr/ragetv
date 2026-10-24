import React from 'react';
import { useTranslation } from 'react-i18next';
import { Match } from '@shared/schemas/fixture';
import { Badge } from '@/components/ui/Badge';
import { Swords, ExternalLink } from 'lucide-react';

interface FixtureCardProps {
  match: Match;
  locale?: string;
}

export const FixtureCard: React.FC<FixtureCardProps> = ({ match, locale = 'en' }) => {
  const { t } = useTranslation();
  const matchDate = new Date(match.scheduledAt);
  const formattedTime = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(matchDate);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
  }).format(matchDate);

  const isLive = match.status === 'running';
  const isCompleted = match.status === 'completed';

  const CardWrapper = match.streamUrl ? 'a' : 'div';
  const wrapperProps = match.streamUrl
    ? {
        href: match.streamUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        className:
          'glass-card rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-[84px] sm:h-[86px] shrink-0 hover:border-brand/40 transition-colors cursor-pointer group',
        title: `${match.tournamentName} - ${match.teamA.name} vs ${match.teamB.name}`,
      }
    : {
        className: 'glass-card rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-[84px] sm:h-[86px] shrink-0',
      };

  return (
    <CardWrapper {...(wrapperProps as React.HTMLAttributes<HTMLElement>)}>
      {/* Tournament Header */}
      <div className="flex items-center justify-between text-xs text-gray-400 gap-2 min-w-0">
        <span className="font-medium text-gray-300 truncate min-w-0 flex-1 flex items-center gap-1.5">
          <span className="truncate">{match.tournamentName}</span>
          {match.streamUrl && (
            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-brand transition-colors shrink-0" />
          )}
        </span>
        {isLive && <Badge variant="live">LIVE</Badge>}
        {!isLive && !isCompleted && (
          <span className="font-mono text-gray-400 shrink-0 text-[11px]">
            {formattedDate} • {formattedTime}
          </span>
        )}
        {isCompleted && (
          <span className="text-[11px] tracking-wider text-gray-400 font-semibold shrink-0">
            {t('fixtures.finished') || 'Finished'}
          </span>
        )}
      </div>

      {/* Teams Matchup Row */}
      <div className="flex items-center justify-between gap-2.5 min-w-0">
        {/* Team A */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-panel border border-surface-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-gray-200">
            {match.teamA.logoUrl ? (
              <img src={match.teamA.logoUrl} alt={match.teamA.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            ) : (
              match.teamA.acronym.slice(0, 3)
            )}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-white truncate">
            {match.teamA.name}
          </span>
        </div>

        {/* Score or VS Indicator with Consistent Height */}
        <div className="shrink-0 h-6 sm:h-7 px-2.5 rounded-md bg-surface-deep/80 border border-surface-border flex items-center justify-center min-w-[50px] text-center">
          {match.score ? (
            <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider leading-none">
              {match.score.teamA} : {match.score.teamB}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 leading-none">
              <Swords className="w-3 h-3 text-brand" /> VS
            </span>
          )}
        </div>

        {/* Team B */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0 text-right">
          <span className="text-xs sm:text-sm font-semibold text-white truncate">
            {match.teamB.name}
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-panel border border-surface-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-gray-200">
            {match.teamB.logoUrl ? (
              <img src={match.teamB.logoUrl} alt={match.teamB.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            ) : (
              match.teamB.acronym.slice(0, 3)
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
