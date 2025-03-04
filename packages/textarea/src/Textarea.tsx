import React from 'react';
import { clsx } from 'clsx';

export interface TextareaProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
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
          'loco-textarea',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
