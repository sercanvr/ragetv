import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, ExternalLink, Radio, Eye, Trophy, Calendar, Maximize2, Minimize2 } from 'lucide-react';
import { GameDefinition } from '@shared/schemas/game';
import { Stream } from '@shared/schemas/stream';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { PopButton } from '@/components/ui/PopButton';
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
      <section className="space-y-4 w-full transition-all duration-300">
        {/* 1. Video Player Container Top Flush (Thinner refined border with neutral corner sheen highlights) */}
        <div className="relative rounded-3xl p-2 sm:p-2.5 bg-surface-card/40 backdrop-blur-xl border border-neutral-300/70 dark:border-white/10 shadow-none transition-all overflow-hidden">
          {/* Specular Ambient Corner Sheen (Neutral White, Not Accent Red) */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-24 h-24 rounded-full bg-white/15 dark:bg-white/[0.09] blur-lg" />
          <div className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/15 dark:bg-white/[0.09] blur-lg" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white/10 dark:bg-white/[0.05] blur-lg" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-white/10 dark:bg-white/[0.05] blur-lg" />

          {isPlayingLive ? (
            <EmbedPlayer
              platform={activeStream.platform}
              channelOrVideoId={activeStream.channel}
              title={activeStream.title}
              isLive={true}
            />
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-card border border-surface-border group shadow-2xl">
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

              {/* Minimalist Centered Play Button (No Black Border in Light Theme) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center p-6">
                <button
                  onClick={() => setIsPlayingLive(true)}
                  className="play-btn w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#D84040] hover:bg-[#E85252] !text-white flex items-center justify-center shadow-[0_0_20px_rgba(216,64,64,0.45)] transition-colors cursor-pointer"
                  aria-label="Start Live Stream"
                >
                  <Play className="play-icon w-5 h-5 sm:w-6 sm:h-6 !fill-white !stroke-white translate-x-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Game Title & Controls Bar (Moved Below Video Screen) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>{game.name}</span>
              <Badge variant="live">{t('player.live')}</Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {onToggleTheater && (
              <PopButton
                onClick={onToggleTheater}
                size="sm"
                className="hidden lg:flex gap-1.5"
                title={isTheaterMode ? (t('tooltips.normalMode') || 'Normal Ekran (T)') : (t('tooltips.theaterMode') || 'Sinema Modu (T)')}
              >
                {isTheaterMode ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>{t('tooltips.normalMode') || 'Normal Ekran (T)'}</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{t('tooltips.theaterMode') || 'Sinema Modu (T)'}</span>
                  </>
                )}
              </PopButton>
            )}

            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface-card px-3 py-1.5 rounded-xl border border-surface-border">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {formatViewerCount(activeStream.viewers, i18n.language)} {t('player.viewers')}
              </span>
            </span>
          </div>
        </div>

        {/* 3. Player Metadata Subbar */}
        <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand shrink-0">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wide truncate max-w-md">
                {activeStream.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                {activeStream.platform.toUpperCase()} • {activeStream.channel}
              </p>
            </div>
          </div>

          <a
            href={livePlatformUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-brand hover:text-brand-hover flex items-center gap-1.5 ml-auto"
          >
            {activeStream.platform === 'youtube' ? t('player.openOnYoutube') : t('player.openOnTwitch')}
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
        <Skeleton className="w-full aspect-video rounded-3xl" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </section>
    );
  }

  return (
    <section className="space-y-4 w-full transition-all duration-300">
      {/* 1. Video Player Container Top Flush (Thinner refined border with neutral corner sheen highlights) */}
      <div className="relative rounded-3xl p-2 sm:p-2.5 bg-surface-card/40 backdrop-blur-xl border border-neutral-300/70 dark:border-white/10 shadow-none transition-all overflow-hidden">
        {/* Specular Ambient Corner Sheen (Neutral White, Not Accent Red) */}
        <div className="pointer-events-none absolute -top-10 -left-10 w-24 h-24 rounded-full bg-white/15 dark:bg-white/[0.09] blur-lg" />
        <div className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/15 dark:bg-white/[0.09] blur-lg" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white/10 dark:bg-white/[0.05] blur-lg" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-white/10 dark:bg-white/[0.05] blur-lg" />

        {isPlayingVod ? (
          <EmbedPlayer
            platform="youtube"
            channelOrVideoId={fallbackVideoId}
            title={vodTitle}
            isLive={false}
          />
        ) : (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-card border border-surface-border group shadow-2xl">
            {/* Poster Image */}
            <img
              src={vodThumbnail}
              alt={game.name}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${fallbackVideoId}/hqdefault.jpg`;
              }}
            />

            {/* Minimalist Centered Play Button (No Black Border in Light Theme) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center p-6">
              <button
                onClick={() => setIsPlayingVod(true)}
                className="play-btn w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#D84040] hover:bg-[#E85252] !text-white flex items-center justify-center shadow-[0_0_20px_rgba(216,64,64,0.45)] transition-colors cursor-pointer"
                aria-label={t('player.playMatch')}
              >
                <Play className="play-icon w-5 h-5 sm:w-6 sm:h-6 !fill-white !stroke-white translate-x-0.5" />
              </button>
            </div>

            {/* Kick-style Bottom Center Floating Blurred Info Card */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 dark:bg-black/75 backdrop-blur-xl border border-white/15 text-xs text-gray-200 shadow-2xl pointer-events-auto max-w-[92%] whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-medium text-white/90">{t('player.noLiveTitle') || 'Şu Anda Resmi Canlı Yayın Yok'}</span>
              </div>
              <div className="h-3 w-[1px] bg-white/20" />
              <a
                href={`https://www.youtube.com/watch?v=${fallbackVideoId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-semibold text-[#D84040] hover:text-[#E85252] transition-colors"
              >
                <span>{t('player.openOnYoutube') || "YouTube'da Aç"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 2. Game Title & Controls Bar (Moved Below Video Screen) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>{game.name}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {onToggleTheater && (
            <PopButton
              onClick={onToggleTheater}
              size="sm"
              className="hidden lg:flex gap-1.5"
              title={isTheaterMode ? (t('tooltips.normalMode') || 'Normal Ekran (T)') : (t('tooltips.theaterMode') || 'Sinema Modu (T)')}
            >
              {isTheaterMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>{t('tooltips.normalMode') || 'Normal Ekran (T)'}</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t('tooltips.theaterMode') || 'Sinema Modu (T)'}</span>
                </>
              )}
            </PopButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlayerStage;
