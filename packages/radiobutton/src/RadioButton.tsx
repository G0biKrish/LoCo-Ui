import React from 'react';
import { clsx } from 'clsx';

export interface RadioButtonProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const RadioButton = React.forwardRef<HTMLDivElement, RadioButtonProps>(
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
          'loco-radiobutton',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
