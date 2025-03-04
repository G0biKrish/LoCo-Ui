import React from 'react';
import { clsx } from 'clsx';

export interface PortalProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
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
          'loco-portal',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Portal.displayName = 'Portal';

export default Portal;
