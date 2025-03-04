import React from 'react';
import { clsx } from 'clsx';

export interface ModalProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
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
          'loco-modal',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
