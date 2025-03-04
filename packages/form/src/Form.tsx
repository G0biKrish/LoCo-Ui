import React from 'react';
import { clsx } from 'clsx';

export interface FormProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Form = React.forwardRef<HTMLDivElement, FormProps>(
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
          'loco-form',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Form.displayName = 'Form';

export default Form;
