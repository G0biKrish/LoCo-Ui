import React from 'react';
import { clsx } from 'clsx';

export interface StatisticProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
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
          'loco-statistic',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Statistic.displayName = 'Statistic';

export default Statistic;
