import React from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
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
          'loco-checkbox',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
