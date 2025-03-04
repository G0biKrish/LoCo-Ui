import React from 'react';
import { clsx } from 'clsx';

export interface SliderProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
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
          'loco-slider',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
