import React from 'react';
import { cn } from '@/lib/utils';

interface WorldMapProps {
  className?: string;
}

/**
 * Curved Globe Horizon World Map (Pure SVG Code Component)
 * - 100% Vector SVG code (No raster PNG).
 * - Curved Arch Globe Projection matching the horizon curvature.
 * - Dual-theme compatible via CSS currentColor.
 * - Full-width flush layout expanding edge-to-edge.
 * - Static background with zero interactive pins or distracting tooltips.
 */
export const WorldMap: React.FC<WorldMapProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1600 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn('w-full h-full select-none pointer-events-none', className)}
    >
      <defs>
        {/* Subtle radial falloff for smooth side dissipation */}
        <radialGradient
          id="globeRadialFade"
          cx="50%"
          cy="30%"
          r="70%"
          fx="50%"
          fy="30%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="65%" stopColor="currentColor" stopOpacity="0.70" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.20" />
        </radialGradient>

        {/* Global Horizon Arc Curve Mask to blend softly with footer edges */}
        <mask id="globeArchMask">
          <rect width="1600" height="480" fill="white" />
          <linearGradient id="globeBottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="80%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <rect width="1600" height="480" fill="url(#globeBottomFade)" />
        </mask>
      </defs>

      <g mask="url(#globeArchMask)" fill="url(#globeRadialFade)">
        {/* Curved Globe Horizon Upper Arch Guideline */}
        <path
          d="M 20,400 Q 800,90 1580,400"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          strokeOpacity="0.22"
          fill="none"
        />

        {/* --- NORTH AMERICA (Curved Horizon Alignment) --- */}
        {/* Alaska & Canadian Arctic Archipelago */}
        <path d="M 160,170 C 180,150 220,135 260,140 C 275,142 270,165 250,175 C 230,185 200,195 180,190 C 165,185 155,178 160,170 Z" />
        <path d="M 280,120 C 310,110 340,115 350,135 C 335,145 310,140 290,135 Z" />
        <path d="M 330,95 C 360,90 390,95 385,115 C 365,120 345,115 330,95 Z" />
        {/* Canada & USA Mainland */}
        <path d="M 230,190 C 260,165 310,150 370,155 C 430,160 480,180 500,210 C 510,230 495,260 460,280 C 430,295 400,305 370,310 C 345,312 330,295 315,280 C 295,265 270,260 250,240 C 230,220 220,205 230,190 Z" />
        {/* Mexico & Central America */}
        <path d="M 370,310 C 390,320 405,340 420,360 C 410,370 395,365 380,345 C 365,330 355,318 370,310 Z" />
        {/* Caribbean Islands */}
        <circle cx="450" cy="330" r="3.5" />
        <circle cx="470" cy="340" r="3" />
        <circle cx="440" cy="345" r="2.5" />

        {/* --- GREENLAND (High Arctic Horizon Peak) --- */}
        <path d="M 520,110 C 560,95 620,105 610,135 C 595,160 550,165 525,145 C 510,135 510,120 520,110 Z" />

        {/* --- SOUTH AMERICA (Curved Horizon Alignment) --- */}
        <path d="M 420,360 C 450,362 485,375 495,400 C 505,430 495,470 465,510 C 445,530 420,520 405,490 C 390,460 385,420 395,390 C 400,375 408,365 420,360 Z" />

        {/* --- EUROPE (Arched towards center apex) --- */}
        {/* British Isles */}
        <path d="M 700,170 C 715,155 730,160 725,180 C 715,195 700,190 700,170 Z" />
        <path d="M 680,180 C 690,175 695,185 690,195 C 680,198 675,190 680,180 Z" />
        {/* Scandinavia */}
        <path d="M 755,115 C 775,105 800,115 790,140 C 780,165 765,180 755,160 C 748,145 745,125 755,115 Z" />
        {/* Continental Europe */}
        <path d="M 725,185 C 755,170 790,170 820,185 C 840,198 845,225 830,245 C 815,260 780,265 755,255 C 730,245 715,220 720,200 C 722,192 723,188 725,185 Z" />
        {/* Iberian Peninsula (Spain/Portugal) & Italy */}
        <path d="M 715,235 C 735,230 745,245 740,260 C 730,275 715,270 710,255 Z" />
        <path d="M 770,240 C 780,240 785,255 778,270 C 772,275 768,265 770,240 Z" />

        {/* --- AFRICA (Centered Meridian) --- */}
        <path d="M 735,275 C 785,265 835,280 855,315 C 875,350 865,400 840,440 C 815,480 780,505 755,505 C 730,500 715,465 710,425 C 705,380 695,335 705,305 C 712,285 722,278 735,275 Z" />
        {/* Madagascar */}
        <path d="M 870,420 C 880,410 890,425 885,450 C 878,460 870,445 870,420 Z" />

        {/* --- ASIA (Dominant Arch across High Apex) --- */}
        {/* Russia / Siberia Apex */}
        <path d="M 830,175 C 890,150 970,140 1060,150 C 1140,160 1210,185 1250,220 C 1280,250 1260,285 1210,310 C 1160,330 1100,325 1040,305 C 990,290 940,295 890,305 C 850,312 820,290 810,260 C 800,225 805,190 830,175 Z" />
        {/* Middle East & Arabian Peninsula */}
        <path d="M 845,285 C 875,280 900,295 905,320 C 910,345 890,365 870,360 C 850,355 840,330 845,285 Z" />
        {/* Indian Subcontinent */}
        <path d="M 955,305 C 990,300 1025,320 1020,355 C 1010,385 985,410 965,405 C 948,400 945,365 950,335 C 952,320 953,310 955,305 Z" />
        {/* Southeast Asia (Indochina & Malay Peninsula) */}
        <path d="M 1060,315 C 1090,310 1115,330 1110,360 C 1100,385 1075,395 1060,370 C 1050,350 1052,330 1060,315 Z" />
        {/* Indonesian Archipelago & Philippines */}
        <circle cx="1120" cy="385" r="5" />
        <circle cx="1145" cy="395" r="6" />
        <circle cx="1175" cy="405" r="5" />
        <circle cx="1140" cy="350" r="4" />
        {/* Japan Arch */}
        <path d="M 1255,225 C 1270,215 1285,230 1275,255 C 1265,270 1250,255 1255,225 Z" />
        <path d="M 1240,265 C 1250,260 1255,275 1248,290 C 1240,295 1235,285 1240,265 Z" />

        {/* --- AUSTRALIA & OCEANIA (Curved Downward Horizon) --- */}
        <path d="M 1180,410 C 1230,395 1290,405 1310,435 C 1325,465 1305,505 1265,515 C 1225,520 1185,500 1165,470 C 1150,445 1155,420 1180,410 Z" />
        {/* New Zealand */}
        <path d="M 1340,480 C 1350,470 1360,480 1352,500 C 1345,510 1335,500 1340,480 Z" />

        {/* --- GLOBAL DATA MATRIX CONSTELLATIONS --- */}
        {Array.from({ length: 64 }).map((_, i) => {
          const col = i % 16;
          const row = Math.floor(i / 16);
          const cx = 90 + col * 95 + (row % 2 === 0 ? 25 : -15);
          const archApex = Math.sin((cx / 1600) * Math.PI) * 130;
          const cy = 230 + row * 45 - archApex;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={1.1}
              fill="currentColor"
              fillOpacity={0.35}
            />
          );
        })}
      </g>
    </svg>
  );
};
