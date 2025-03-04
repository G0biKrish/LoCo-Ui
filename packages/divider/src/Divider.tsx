import React from 'react';
import { clsx } from 'clsx';

export interface DividerProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
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
          'loco-divider',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
