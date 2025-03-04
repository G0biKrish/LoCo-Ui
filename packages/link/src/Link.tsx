import React from 'react';
import { clsx } from 'clsx';

export interface LinkProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Link = React.forwardRef<HTMLDivElement, LinkProps>(
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
          'loco-link',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Link.displayName = 'Link';

export default Link;
