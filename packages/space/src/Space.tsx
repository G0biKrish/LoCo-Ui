import React from 'react';
import { clsx } from 'clsx';

export interface SpaceProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
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
          'loco-space',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Space.displayName = 'Space';

export default Space;
