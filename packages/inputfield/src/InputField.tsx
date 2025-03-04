import React from 'react';
import { clsx } from 'clsx';

export interface InputFieldProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
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
          'loco-inputfield',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
