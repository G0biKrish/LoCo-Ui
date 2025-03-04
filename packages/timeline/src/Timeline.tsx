import React from 'react';
import { clsx } from 'clsx';

export interface TimelineProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
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
          'loco-timeline',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

export default Timeline;
