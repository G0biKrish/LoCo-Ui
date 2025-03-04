import React from 'react';
import { clsx } from 'clsx';

export interface StepperProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
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
          'loco-stepper',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

export default Stepper;
