import React from 'react';
import { clsx } from 'clsx';

export interface TooltipProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
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
          'loco-tooltip',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
