import React from 'react';
import { clsx } from 'clsx';

export interface ListProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(
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
          'loco-list',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

List.displayName = 'List';

export default List;
