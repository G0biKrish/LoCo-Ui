import React from 'react';
import { clsx } from 'clsx';

export interface HeaderProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
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
          'loco-header',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Header.displayName = 'Header';

export default Header;
