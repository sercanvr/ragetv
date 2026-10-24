import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'live' | 'vod' | 'brand' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase select-none',
        variant === 'live' && 'bg-[#D84040] text-white font-bold border-transparent shadow-sm',
        variant === 'vod' && 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
        variant === 'brand' && 'bg-brand/15 text-brand border border-brand/30',
        variant === 'neutral' && 'bg-surface-border text-gray-300 border border-surface-borderLight',
        className
      )}
      {...props}
    >
      {variant === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      )}
      {children}
    </span>
  );
};
