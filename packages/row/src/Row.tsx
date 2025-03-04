import React from 'react';
import { clsx } from 'clsx';

export interface RowProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
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
          'loco-row',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Row.displayName = 'Row';

export default Row;
