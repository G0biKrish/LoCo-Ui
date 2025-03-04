import React from 'react';
import { clsx } from 'clsx';

export interface TypographyProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
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
          'loco-typography',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
