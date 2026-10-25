import * as React from 'react';
import { cn } from '@/lib/utils';

type Color =
  | 'default'
  | 'red'
  | 'blue'
  | 'purple'
  | 'green'
  | 'neutral';

type SizeVariant = 'sm' | 'default' | 'lg';

export interface PopButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: SizeVariant;
  children: React.ReactNode;
}

export const PopButton = React.forwardRef<HTMLButtonElement, PopButtonProps>(
  (
    { className, color = 'default', size = 'default', children, ...props },
    ref,
  ) => {

    const baseClasses =
      'inline-flex select-none transition-colors items-center justify-center whitespace-nowrap rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:border-b-2 active:translate-y-0.5 border-x-2 border-t-2 border-b-4 origin-bottom cursor-pointer font-medium';

    const colors: Record<Color, string> = {
      default:
        'bg-white hover:bg-neutral-100 border-neutral-300 border-b-neutral-400 text-neutral-800 dark:bg-[#242429] dark:hover:bg-[#2D2D34] dark:border-[#4A4A54] dark:border-b-[#35353F] dark:text-white shadow-sm',
      red:
        'bg-[#D84040] hover:bg-[#E85252] border-[#D84040] border-b-[#8A1B1B] text-white shadow-sm shadow-[#D84040]/20',
      blue:
        'bg-blue-600 hover:bg-blue-500 border-blue-600 border-b-blue-900 text-white shadow-sm',
      purple:
        'bg-purple-600 hover:bg-purple-500 border-purple-600 border-b-purple-900 text-white shadow-sm',
      green:
        'bg-emerald-600 hover:bg-emerald-500 border-emerald-600 border-b-emerald-900 text-white shadow-sm',
      neutral:
        'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 border-b-neutral-400 text-neutral-900 dark:bg-[#1E1E23] dark:hover:bg-[#27272D] dark:border-[#42424C] dark:border-b-[#30303A] dark:text-neutral-200 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 py-1 text-xs font-semibold',
      default: 'h-10 px-4 py-2 text-xs sm:text-sm font-semibold',
      lg: 'h-12 px-6 py-2.5 text-sm sm:text-base font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          colors[color],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

PopButton.displayName = 'PopButton';

export default PopButton;
