import React from 'react';
import { clsx } from 'clsx';

export interface PopoverProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
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
          'loco-popover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Popover.displayName = 'Popover';

export default Popover;
