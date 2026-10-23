import React from 'react';
import { cn } from '@/lib/utils';

interface WorldMapProps {
  className?: string;
}

/**
 * Authentic Curved Globe Horizon World Map (Solid Flat Silhouette)
 * - Faithfully reproduces the curved globe horizon silhouette matching user specifications.
 * - Flat solid continents (zero dotted patterns, zero interactive pins or distracting tooltips).
 * - 100% responsive and dual-theme native via CSS mask-image and currentColor.
 * - Automatically inherits foreground/text color with smooth theme transitions.
 */
export const WorldMap: React.FC<WorldMapProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full h-full select-none pointer-events-none relative flex items-center justify-center',
        className
      )}
      aria-hidden="true"
    >
      <div
        className="w-full h-full bg-current transition-colors duration-300"
        style={{
          maskImage: 'url(/world-map.png)',
          WebkitMaskImage: 'url(/world-map.png)',
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center 15%',
          WebkitMaskPosition: 'center 15%',
        }}
      />
    </div>
  );
};

export default WorldMap;
