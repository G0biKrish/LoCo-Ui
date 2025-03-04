import React from 'react';
import { clsx } from 'clsx';

export interface DrawerProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
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
          'loco-drawer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
