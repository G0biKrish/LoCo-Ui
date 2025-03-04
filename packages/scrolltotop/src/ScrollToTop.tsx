import React from 'react';
import { clsx } from 'clsx';

export interface ScrollToTopProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const ScrollToTop = React.forwardRef<HTMLDivElement, ScrollToTopProps>(
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
          'loco-scrolltotop',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;
