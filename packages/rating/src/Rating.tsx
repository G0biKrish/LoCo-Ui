import React from 'react';
import { clsx } from 'clsx';

export interface RatingProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
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
          'loco-rating',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;
