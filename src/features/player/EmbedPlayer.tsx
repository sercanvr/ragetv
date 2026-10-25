import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { StreamPlatform } from '@shared/schemas/stream';
import { buildTwitchEmbedUrl, buildYouTubeEmbedUrl } from '@shared/urls';
import { Button } from '@/components/ui/Button';

interface EmbedPlayerProps {
  platform: StreamPlatform;
  channelOrVideoId: string;
  title: string;
  isLive?: boolean;
}

export const EmbedPlayer: React.FC<EmbedPlayerProps> = ({
  platform,
  channelOrVideoId,
  title,
  isLive = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  const embedUrl =
    platform === 'twitch'
      ? buildTwitchEmbedUrl(channelOrVideoId, currentHost, true)
      : buildYouTubeEmbedUrl(channelOrVideoId, true);

  const fallbackUrl =
    platform === 'twitch'
      ? `https://www.twitch.tv/${channelOrVideoId}`
      : `https://www.youtube.com/watch?v=${channelOrVideoId}`;

  // Apply default 10% volume and 1080p quality when iframe loads
  const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';

  const handleIframeLoad = () => {
    // Native player manages optimal adaptive bitrate and stream playback seamlessly
  };

  // Keyboard shortcut listeners (Ctrl+K: Play/Pause, Ctrl+M: Mute/Unmute)
  useEffect(() => {
    const handleTogglePlayback = () => {
      if (platform === 'youtube' && iframeRef.current?.contentWindow) {
        try {
          const nextState = !isPaused;
          setIsPaused(nextState);
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: nextState ? 'pauseVideo' : 'playVideo',
              args: [],
            }),
            YOUTUBE_ORIGIN
          );
        } catch (error) {
          // Silently handle cross-origin sandbox restrictions
          void error;
        }
      }
    };

    const handleToggleMute = () => {
      if (platform === 'youtube' && iframeRef.current?.contentWindow) {
        try {
          const nextMute = !isMuted;
          setIsMuted(nextMute);
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: nextMute ? 'mute' : 'unMute',
              args: [],
            }),
            YOUTUBE_ORIGIN
          );
          if (!nextMute) {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'setVolume', args: [10] }),
              YOUTUBE_ORIGIN
            );
          }
        } catch (error) {
          // Silently handle cross-origin sandbox restrictions
          void error;
        }
      }
    };

    window.addEventListener('ragetv:toggle-playback', handleTogglePlayback);
    window.addEventListener('ragetv:toggle-mute', handleToggleMute);

    return () => {
      window.removeEventListener('ragetv:toggle-playback', handleTogglePlayback);
      window.removeEventListener('ragetv:toggle-mute', handleToggleMute);
    };
  }, [platform, isPaused, isMuted]);

  if (hasError) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-surface-card border border-surface-border flex flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-400" />
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white">Embed Playback Blocked or Unavailable</h3>
          <p className="text-xs text-gray-400 max-w-md">
            This tournament broadcast restricts third-party embedding or your browser blocked the iframe. You can watch it directly on the official platform.
          </p>
        </div>
        <a href={fallbackUrl} target="_blank" rel="noreferrer">
          <Button variant="primary" size="md">
            Watch Directly on {platform === 'twitch' ? 'Twitch' : 'YouTube'} <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-surface-border shadow-2xl">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={isLive ? `${title} (Live Stream)` : `${title} (Replay)`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={handleIframeLoad}
        onError={() => setHasError(true)}
        className="w-full h-full border-0 absolute inset-0"
      />
    </div>
  );
};
