import React from 'react';
import { clsx } from 'clsx';

export interface NotificationProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
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
          'loco-notification',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Notification.displayName = 'Notification';

export default Notification;
