import React from 'react';
import { clsx } from 'clsx';

export interface ColumnProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
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
          'loco-column',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Column.displayName = 'Column';

export default Column;
