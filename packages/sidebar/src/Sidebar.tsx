import React from 'react';
import { clsx } from 'clsx';

export interface SidebarProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
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
          'loco-sidebar',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
