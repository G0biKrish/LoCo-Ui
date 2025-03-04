import React from 'react';
import { clsx } from 'clsx';

export interface ErrorBoundaryProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const ErrorBoundary = React.forwardRef<HTMLDivElement, ErrorBoundaryProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'loco-errorboundary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ErrorBoundary.displayName = 'ErrorBoundary';

export default ErrorBoundary;
