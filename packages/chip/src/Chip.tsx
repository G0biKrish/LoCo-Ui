import React from 'react';
import { clsx } from 'clsx';

export interface ChipProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
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
          'loco-chip',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
