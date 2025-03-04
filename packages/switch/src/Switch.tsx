import React from 'react';
import { clsx } from 'clsx';

export interface SwitchProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
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
          'loco-switch',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
