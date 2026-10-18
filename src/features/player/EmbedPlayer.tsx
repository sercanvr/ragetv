import React, { useState } from 'react';
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
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  const embedUrl =
    platform === 'twitch'
      ? buildTwitchEmbedUrl(channelOrVideoId, currentHost, true)
      : buildYouTubeEmbedUrl(channelOrVideoId, true);

  const fallbackUrl =
    platform === 'twitch'
      ? `https://www.twitch.tv/${channelOrVideoId}`
      : `https://www.youtube.com/watch?v=${channelOrVideoId}`;

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
        src={embedUrl}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onError={() => setHasError(true)}
        className="w-full h-full border-0 absolute inset-0"
      />
    </div>
  );
};
