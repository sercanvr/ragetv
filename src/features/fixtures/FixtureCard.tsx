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

  return (
    <div className="glass-card rounded-xl p-3.5 flex flex-col gap-2.5">
      {/* Tournament Header */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="font-medium text-gray-300 truncate max-w-[200px]">
          {match.tournamentName}
        </span>
        {isLive && <Badge variant="live">LIVE</Badge>}
        {!isLive && !isCompleted && (
          <span className="font-mono text-gray-400">
            {formattedDate} • {formattedTime}
          </span>
        )}
        {isCompleted && (
          <span className="text-[11px] tracking-wider text-gray-400 font-semibold">
            {t('fixtures.finished') || 'Finished'}
          </span>
        )}
      </div>

      {/* Teams Matchup Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Team A */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-surface-panel border border-surface-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-gray-200">
            {match.teamA.logoUrl ? (
              <img src={match.teamA.logoUrl} alt={match.teamA.name} className="w-6 h-6 object-contain" />
            ) : (
              match.teamA.acronym.slice(0, 3)
            )}
          </div>
          <span className="text-sm font-semibold text-white truncate">
            {match.teamA.name}
          </span>
        </div>

        {/* Score or VS Indicator */}
        <div className="shrink-0 px-3 py-1 rounded-md bg-surface-deep/80 border border-surface-border text-center">
          {match.score ? (
            <span className="text-sm font-mono font-bold text-white tracking-wider">
              {match.score.teamA} : {match.score.teamB}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
              <Swords className="w-3 h-3 text-brand" /> VS
            </span>
          )}
        </div>

        {/* Team B */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0 text-right">
          <span className="text-sm font-semibold text-white truncate">
            {match.teamB.name}
          </span>
          <div className="w-8 h-8 rounded-lg bg-surface-panel border border-surface-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-gray-200">
            {match.teamB.logoUrl ? (
              <img src={match.teamB.logoUrl} alt={match.teamB.name} className="w-6 h-6 object-contain" />
            ) : (
              match.teamB.acronym.slice(0, 3)
            )}
          </div>
        </div>
      </div>

      {/* Watch Stream Link (if available and live) */}
      {match.streamUrl && isLive && (
        <a
          href={match.streamUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-brand hover:text-brand-hover flex items-center justify-end gap-1 pt-1"
        >
          Watch Match Stream <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};
