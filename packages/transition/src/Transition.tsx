import React from 'react';
import { clsx } from 'clsx';

export interface TransitionProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
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
          'loco-transition',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Transition.displayName = 'Transition';

export default Transition;
