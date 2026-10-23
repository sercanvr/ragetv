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
  asChild?: boolean;
}

// Lightweight, type-safe Slot implementation
const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ...props,
        ...(children.props as any),
        ref,
        className: cn(props.className, (children.props as any)?.className),
      });
    }
    return null;
  }
);
Slot.displayName = 'Slot';

export const PopButton = React.forwardRef<HTMLButtonElement, PopButtonProps>(
  (
    { className, color = 'default', size = 'default', children, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? (Slot as any) : 'button';

    const baseClasses =
      'inline-flex select-none transition-colors items-center justify-center whitespace-nowrap rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:border-b-2 active:translate-y-0.5 border-x-2 border-t-2 border-b-4 origin-bottom cursor-pointer font-medium';

    const colors: Record<Color, string> = {
      default:
        'bg-neutral-100 hover:bg-neutral-200/90 border-neutral-300 border-b-neutral-400 text-neutral-800 dark:bg-neutral-800/90 dark:hover:bg-neutral-700/90 dark:border-neutral-700 dark:border-b-neutral-950 dark:text-neutral-100 shadow-sm',
      red:
        'bg-[#D84040] hover:bg-[#E85252] border-[#D84040] border-b-[#8A1B1B] text-white shadow-sm shadow-[#D84040]/20',
      blue:
        'bg-blue-600 hover:bg-blue-500 border-blue-600 border-b-blue-900 text-white shadow-sm',
      purple:
        'bg-purple-600 hover:bg-purple-500 border-purple-600 border-b-purple-900 text-white shadow-sm',
      green:
        'bg-emerald-600 hover:bg-emerald-500 border-emerald-600 border-b-emerald-900 text-white shadow-sm',
      neutral:
        'bg-neutral-200 hover:bg-neutral-300 border-neutral-400 border-b-neutral-500 text-neutral-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800 dark:border-b-black dark:text-neutral-200 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 py-1 text-xs font-semibold',
      default: 'h-10 px-4 py-2 text-xs sm:text-sm font-semibold',
      lg: 'h-12 px-6 py-2.5 text-sm sm:text-base font-bold',
    };

    return (
      <Comp
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
      </Comp>
    );
  },
);

PopButton.displayName = 'PopButton';

export default PopButton;
