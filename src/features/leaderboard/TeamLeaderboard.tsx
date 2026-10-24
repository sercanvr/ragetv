import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Crown, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { getLeaderboardByGame } from '@shared/registry/leaderboard';
import { ChampionTicket } from './ChampionTicket';
import { cn } from '@/lib/utils';

interface TeamLeaderboardProps {
  gameSlug: string;
}

export const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({ gameSlug }) => {
  const { t } = useTranslation();
  const data = getLeaderboardByGame(gameSlug);

  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Reigning Champion Ticket Card */}
      <ChampionTicket champion={data.champion} />

      {/* Leaderboard Table / Rankings (Referans Görsel 3) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3 border-[1.5px] border-neutral-400/90 dark:border-white/[0.22]">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-gradient-title">
              {t('leaderboard.title') || 'Dünya Takım Sıralaması (Top 10)'}
            </h3>
          </div>
          <span className="text-xs font-semibold text-muted-foreground font-mono">
            {t('leaderboard.points') || 'Puan'}
          </span>
        </div>

        {/* Team List (Image 3 layout) */}
        <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
          {data.teams.map((team) => {
            const isFirst = team.rank === 1;
            const isTopThree = team.rank <= 3;

            return (
              <div
                key={team.id}
                className={cn(
                  'flex items-center justify-between p-2.5 rounded-xl transition-colors duration-150',
                  isFirst
                    ? 'bg-amber-500/10 border border-amber-500/35'
                    : 'bg-surface-card/60 hover:bg-surface-card border border-surface-border'
                )}
              >
                {/* Rank & Team Info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank indicator */}
                  <div className="w-6 flex items-center justify-center shrink-0">
                    {isFirst ? (
                      <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <span
                        className={cn(
                          'text-xs font-bold font-mono',
                          team.rank === 2
                            ? 'text-gray-300 dark:text-gray-200'
                            : team.rank === 3
                            ? 'text-amber-500'
                            : 'text-muted-foreground'
                        )}
                      >
                        {team.rank}
                      </span>
                    )}
                  </div>

                  {/* Team Avatar Logo */}
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-surface-deep border border-surface-border shrink-0 p-0.5 flex items-center justify-center">
                    <img
                      src={team.logoUrl}
                      alt={team.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Team Name & Region */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-foreground truncate">
                        {team.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-deep text-muted-foreground font-mono">
                        {team.region}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Points & Trend */}
                <div className="flex items-center gap-2 shrink-0">
                  {team.change === 'up' && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  {team.change === 'down' && (
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  {team.change === 'same' && (
                    <Minus className="w-3.5 h-3.5 text-gray-500" />
                  )}

                  <span
                    className={cn(
                      'text-xs font-mono font-bold',
                      isFirst
                        ? 'text-amber-400'
                        : isTopThree
                        ? 'text-amber-300 dark:text-amber-400'
                        : 'text-foreground/90'
                    )}
                  >
                    {team.points.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Source Footer note */}
        <p className="text-[10px] text-muted-foreground/70 text-center pt-1 font-mono">
          Kaynak: {data.source} ({data.season})
        </p>
      </div>
    </div>
  );
};
