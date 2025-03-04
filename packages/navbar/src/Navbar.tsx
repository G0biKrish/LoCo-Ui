import React from 'react';
import { clsx } from 'clsx';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the navbar
   */
  children?: React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx('loco-navbar w-full', className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export default Navbar;
