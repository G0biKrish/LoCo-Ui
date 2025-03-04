import React from 'react';
import { clsx } from 'clsx';

export interface TableProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
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
          'loco-table',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Table.displayName = 'Table';

export default Table;
