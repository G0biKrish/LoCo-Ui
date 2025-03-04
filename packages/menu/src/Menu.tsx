import React from 'react';
import { clsx } from 'clsx';

export interface MenuProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
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
          'loco-menu',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
