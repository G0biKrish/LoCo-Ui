import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
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
          'loco-button',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
