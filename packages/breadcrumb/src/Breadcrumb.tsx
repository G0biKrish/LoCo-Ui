import React from 'react';
import { clsx } from 'clsx';

export interface BreadcrumbProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
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
          'loco-breadcrumb',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
