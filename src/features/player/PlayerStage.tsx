import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, ExternalLink, Radio, Eye, Trophy } from 'lucide-react';
import { GameDefinition } from '@shared/schemas/game';
import { Stream } from '@shared/schemas/stream';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmbedPlayer } from './EmbedPlayer';
import { formatViewerCount } from '@/lib/utils';

interface PlayerStageProps {
  game: GameDefinition;
  activeStream: Stream | null;
}

export const PlayerStage: React.FC<PlayerStageProps> = ({ game, activeStream }) => {
  const { t, i18n } = useTranslation();
  const [isPlayingVod, setIsPlayingVod] = useState(false);

  // If there's an active live stream, show live stream directly
  if (activeStream) {
    const streamUrl =
      activeStream.platform === 'twitch'
        ? `https://www.twitch.tv/${activeStream.channel}`
        : `https://www.youtube.com/watch?v=${activeStream.channel}`;

    return (
      <section className="space-y-4">
        {/* Game Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>{game.name}</span>
              <Badge variant="live">{t('player.live')}</Badge>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">{game.tagline}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-surface-card px-3 py-1.5 rounded-full border border-surface-border">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formatViewerCount(activeStream.viewers, i18n.language)} {t('player.viewers')}</span>
            </span>
          </div>
        </div>

        {/* 16:9 Official Live Embed Player */}
        <EmbedPlayer
          platform={activeStream.platform}
          channelOrVideoId={activeStream.channel}
          title={activeStream.title}
          isLive={true}
        />

        {/* Player Metadata Subbar */}
        <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand shrink-0">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-white line-clamp-1">
                {activeStream.title}
              </h2>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span>{t('player.channel')}: <strong className="text-gray-200">@{activeStream.channel}</strong></span>
              </p>
            </div>
          </div>

          <a
            href={streamUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-brand hover:text-brand-hover flex items-center gap-1.5 ml-auto"
          >
            {activeStream.platform === 'twitch' ? t('player.openOnTwitch') : t('player.openOnYoutube')}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    );
  }

  // Fallback VOD / Recent Tournament Match Stage
  const fallbackVideoId = game.vodSource.defaultVideoId || 'f02mOEt11OQ';

  return (
    <section className="space-y-4">
      {/* Game Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>{game.name}</span>
            <Badge variant="vod">{t('player.vod')}</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">{game.tagline}</p>
        </div>

        <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-surface-card px-3 py-1.5 rounded-full border border-surface-border">
          <Trophy className="w-3.5 h-3.5 text-blue-400" />
          <span>Official Replay</span>
        </span>
      </div>

      {/* VOD Player or Poster Facade */}
      {isPlayingVod ? (
        <EmbedPlayer
          platform="youtube"
          channelOrVideoId={fallbackVideoId}
          title={`${game.name} Recent Tournament Championship Replay`}
          isLive={false}
        />
      ) : (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-card border border-surface-border group">
          {/* Poster Image */}
          <img
            src={`https://i.ytimg.com/vi/${fallbackVideoId}/maxresdefault.jpg`}
            alt={game.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
            onError={(e) => {
              // Fallback to hqdefault if maxres not available
              (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${fallbackVideoId}/hqdefault.jpg`;
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
            <button
              onClick={() => setIsPlayingVod(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand hover:bg-brand-hover text-white flex items-center justify-center shadow-brand-glow transform group-hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label={t('player.playMatch')}
            >
              <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
            </button>

            <div className="mt-4 max-w-lg space-y-1">
              <Badge variant="vod" className="mb-2">{t('player.vod')}</Badge>
              <h2 className="text-base sm:text-xl font-bold text-white line-clamp-1">
                {game.name} — Recent Championship Grand Finals
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                {t('player.noLiveDesc')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metadata Subbar */}
      <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-blue-400" />
          <span>{t('player.noLiveTitle')}</span>
        </div>

        <a
          href={`https://www.youtube.com/watch?v=${fallbackVideoId}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-brand hover:text-brand-hover flex items-center gap-1.5 ml-auto"
        >
          {t('player.openOnYoutube')} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
