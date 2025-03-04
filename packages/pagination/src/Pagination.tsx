import React from 'react';
import { clsx } from 'clsx';

export interface PaginationProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
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
          'loco-pagination',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
