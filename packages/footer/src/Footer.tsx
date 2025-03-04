import React from 'react';
import { clsx } from 'clsx';

export interface FooterProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
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
          'loco-footer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Footer.displayName = 'Footer';

export default Footer;
