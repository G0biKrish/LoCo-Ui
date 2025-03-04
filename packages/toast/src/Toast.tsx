import React from 'react';
import { clsx } from 'clsx';

export interface ToastProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
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
          'loco-toast',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
