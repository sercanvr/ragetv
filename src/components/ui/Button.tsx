import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          // Variants
          variant === 'primary' && 'bg-brand hover:bg-brand-hover text-white shadow-brand-glow',
          variant === 'secondary' && 'bg-surface-card hover:bg-surface-panel text-white border border-surface-border',
          variant === 'outline' && 'border border-surface-borderLight text-gray-200 hover:border-brand hover:text-white',
          variant === 'ghost' && 'text-gray-400 hover:text-white hover:bg-white/5',
          // Sizes
          size === 'sm' && 'text-xs px-2.5 py-1.5 gap-1.5',
          size === 'md' && 'text-sm px-4 py-2 gap-2',
          size === 'lg' && 'text-base px-5 py-2.5 gap-2.5 font-semibold',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
