import React from 'react';
import { clsx } from 'clsx';

export interface CollapseProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
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
          'loco-collapse',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Collapse.displayName = 'Collapse';

export default Collapse;
