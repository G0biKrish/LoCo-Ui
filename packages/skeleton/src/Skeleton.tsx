import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
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
          'loco-skeleton',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
