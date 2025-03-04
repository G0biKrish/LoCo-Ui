import React from 'react';
import { clsx } from 'clsx';

export interface DropdownMenuProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
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
          'loco-dropdownmenu',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
