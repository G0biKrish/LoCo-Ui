import React from 'react';
import { clsx } from 'clsx';

export interface LabelProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(
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
          'loco-label',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Label.displayName = 'Label';

export default Label;
