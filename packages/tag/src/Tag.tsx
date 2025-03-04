import React from 'react';
import { clsx } from 'clsx';

export interface TagProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
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
          'loco-tag',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
