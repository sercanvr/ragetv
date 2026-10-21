import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, ExternalLink, Radio, Eye, Trophy, Calendar, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { GameDefinition } from '@shared/schemas/game';
import { Stream } from '@shared/schemas/stream';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmbedPlayer } from './EmbedPlayer';
import { formatViewerCount } from '@/lib/utils';
import { useVod } from '@/features/vod/useVod';

interface PlayerStageProps {
  game: GameDefinition;
  activeStream: Stream | null;
  isTheaterMode?: boolean;
  onToggleTheater?: () => void;
}

export const PlayerStage: React.FC<PlayerStageProps> = ({
  game,
  activeStream,
  isTheaterMode = false,
  onToggleTheater,
}) => {
  const { t, i18n } = useTranslation();
  const [isPlayingLive, setIsPlayingLive] = useState(false);
  const [isPlayingVod, setIsPlayingVod] = useState(false);
  const { data: vodData, isLoading: isVodLoading } = useVod(game.slug);

  // If user presses Ctrl+K and video has not started yet, start it immediately
  useEffect(() => {
    const handleKeyStart = () => {
      if (activeStream && !isPlayingLive) {
        setIsPlayingLive(true);
      } else if (!activeStream && !isPlayingVod) {
        setIsPlayingVod(true);
      }
    };

    window.addEventListener('ragetv:toggle-playback', handleKeyStart);
    return () => window.removeEventListener('ragetv:toggle-playback', handleKeyStart);
  }, [activeStream, isPlayingLive, isPlayingVod]);

  // 1. Live Stream Active State
  if (activeStream) {
    const streamUrl =
      activeStream.platform === 'twitch'
        ? `https://www.twitch.tv/${activeStream.channel}`
        : `https://www.youtube.com/watch?v=${activeStream.channel}`;

    const liveThumbnail =
      activeStream.thumbnailUrl ||
      `https://static-cdn.jtvnw.net/previews-ttv/live_user_${activeStream.channel}-640x360.jpg`;

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
            {onToggleTheater && (
              <button
                onClick={onToggleTheater}
                className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-surface-card hover:bg-surface-panel px-3 py-1.5 rounded-full border border-surface-border transition-colors select-none"
                title="Sinema Modu (Ctrl + T)"
              >
                {isTheaterMode ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Normal Ekran</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Sinema Modu (Ctrl+T)</span>
                  </>
                )}
              </button>
            )}

            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface-card px-3 py-1.5 rounded-full border border-surface-border">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {formatViewerCount(activeStream.viewers, i18n.language)} {t('player.viewers')}
              </span>
            </span>
          </div>
        </div>

        {/* 16:9 Live Player OR Paused Facade (Strictly No Autoplay) */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-surface-borderLight/40 via-surface-border/30 to-brand/20 backdrop-blur-md shadow-[0_0_35px_-8px_rgba(252,53,100,0.2)]">
          {isPlayingLive ? (
            <EmbedPlayer
              platform={activeStream.platform}
              channelOrVideoId={activeStream.channel}
              title={activeStream.title}
              isLive={true}
            />
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-card border border-surface-border/50 group shadow-2xl">
              {/* Live Stream Poster Thumbnail */}
              <img
                src={liveThumbnail}
                alt={activeStream.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1280&q=80';
                }}
              />

              {/* Gradient Overlay & Play Action */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlayingLive(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand hover:bg-brand-hover text-white flex items-center justify-center shadow-brand-glow transform group-hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Start Live Stream"
                >
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
                </button>

                <div className="mt-4 max-w-lg space-y-1.5">
                  <Badge variant="live" className="mb-1">
                    CANLI YAYIN BEKLEMEDE
                  </Badge>
                  <h2 className="text-base sm:text-xl font-bold text-white line-clamp-1">
                    {activeStream.title}
                  </h2>
                  <p className="text-xs text-gray-300 flex items-center justify-center gap-1.5">
                    <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                    Sürpriz ses olmaması için yayın duraklatıldı. Başlatmak için tıklayın.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

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
                <span>
                  {t('player.channel')}: <strong className="text-gray-200">@{activeStream.channel}</strong>
                </span>
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

  // 2. Fallback VOD / Recent Tournament Match Stage
  const vod = vodData?.vod;
  const fallbackVideoId = vod?.videoId || game.vodSource.defaultVideoId || 'f02mOEt11OQ';
  const vodTitle = vod?.title || `${game.name} — Recent Championship Grand Finals`;
  const vodThumbnail =
    vod?.thumbnailUrl || `https://i.ytimg.com/vi/${fallbackVideoId}/hqdefault.jpg`;

  if (isVodLoading && !vod) {
    return (
      <section className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="w-full aspect-video rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </section>
    );
  }

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

        <div className="flex items-center gap-2">
          {onToggleTheater && (
            <button
              onClick={onToggleTheater}
              className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-surface-card hover:bg-surface-panel px-3 py-1.5 rounded-full border border-surface-border transition-colors select-none"
              title="Sinema Modu (Ctrl + T)"
            >
              {isTheaterMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Normal Ekran</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Sinema Modu (Ctrl+T)</span>
                </>
              )}
            </button>
          )}

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface-card px-3 py-1.5 rounded-full border border-surface-border">
            <Trophy className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Tournament VOD</span>
          </span>
        </div>
      </div>

      {/* VOD Player or Poster Facade */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-surface-borderLight/40 via-surface-border/30 to-brand/20 backdrop-blur-md shadow-[0_0_35px_-8px_rgba(252,53,100,0.2)]">
        {isPlayingVod ? (
          <EmbedPlayer
            platform="youtube"
            channelOrVideoId={fallbackVideoId}
            title={vodTitle}
            isLive={false}
          />
        ) : (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-card border border-surface-border/50 group shadow-2xl">
            {/* Poster Image */}
            <img
              src={vodThumbnail}
              alt={game.name}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
              onError={(e) => {
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
                <Badge variant="vod" className="mb-2">
                  {t('player.vod')}
                </Badge>
                <h2 className="text-base sm:text-xl font-bold text-white line-clamp-1">
                  {vodTitle}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-1.5">
                  <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                  {t('player.noLiveDesc')} (Tıklayarak başlatabilirsiniz)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metadata Subbar */}
      <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-400" />
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
