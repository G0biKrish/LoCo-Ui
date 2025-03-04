import React from 'react';
import { clsx } from 'clsx';

export interface TimePickerProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
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
          'loco-timepicker',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
