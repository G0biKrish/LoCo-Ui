import React from 'react';
import { clsx } from 'clsx';

export interface CarouselProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
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
          'loco-carousel',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;
