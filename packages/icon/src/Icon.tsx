import React from 'react';
import { clsx } from 'clsx';

export interface IconProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
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
          'loco-icon',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
