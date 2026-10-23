import React from 'react';
import { cn } from '@/lib/utils';

interface WorldMapProps {
  className?: string;
}

/**
 * Authentic Curved Globe Horizon World Map (Solid Flat Silhouette)
 * - High-DPI 2044x1086 supersampled Hermite smoothstep anti-aliasing.
 * - Flat solid continents (zero dotted patterns, zero interactive pins or distracting tooltips).
 * - Instantaneous theme switching without flicker or laggy transitions.
 * - Fully masked and clipped to prevent any protrusion outside parent borders.
 */
export const WorldMap: React.FC<WorldMapProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full h-full select-none pointer-events-none relative flex items-center justify-center overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <div
        className="w-full h-full bg-current transition-none"
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
