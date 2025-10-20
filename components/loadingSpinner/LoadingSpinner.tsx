import { cn } from '@/lib/utils';
import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'; // Size of the spinner in pixels
  message?: string; // Optional message to display below the spinner
  className?: string; // Additional CSS classes for customization
  showMessage?: boolean; // Whether to show the message or not
}
const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  className,
  showMessage = true,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
  };
  const containerPadding = {
    sm: 'min-h-[60px]',
    md: 'min-h-[80px]',
    lg: 'min-h-[100px]',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        containerPadding[size],
        className
      )}>
      <div
        className={cn(
          'animate-spin rounded-full border-muted-foreground/20  border-t-primary ',
          sizeClasses[size]
        )}
        role='status'
        arial-label='Loading'
      />
      {showMessage && (
        <p className='mt-3 text-muted-foreground text-sm animate-pulse '>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

// Inline variant for use within layouts

export function InlineSpinner({
  size = 'sm',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-6 h-6 border-[3px]',
  };

  return (
    <div
      className={cn(
        ' animate-spin rounded-full border-muted-foreground/20  border-t-primary ',
        sizeClasses[size],
        className
      )}
      role='status'
      arial-label='Loading'
    />
  );
}
