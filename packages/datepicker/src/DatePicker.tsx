import React from 'react';
import { clsx } from 'clsx';

export interface DatePickerProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
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
          'loco-datepicker',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
