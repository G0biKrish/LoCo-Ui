import React, { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { X, AlertCircle, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

export interface AlertProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Child elements or content of the alert
   */
  children?: React.ReactNode;
  
  /**
   * Variant to control the styling of the alert
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  
  /**
   * Optional custom icon to override the default icon for the variant
   */
  icon?: React.ReactNode;
  
  /**
   * Whether to show the default icon based on variant
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Optional title for the alert
   */
  title?: string;
  
  /**
   * Whether the alert is dismissible by showing a close button
   * @default false
   */
  dismissible?: boolean;
  
  /**
   * Callback fired when the alert is closed
   */
  onClose?: () => void;
  
  /**
   * Auto close delay in milliseconds (if greater than 0, the alert will auto-close after this interval)
   * @default 0
   */
  autoClose?: number;
  
  /**
   * Animation direction for the alert
   * @default 'right'
   */
  animationDirection?: 'left' | 'right' | 'top' | 'bottom';
  
  /**
   * Whether to show a solid background instead of a light one
   * @default false
   */
  solid?: boolean;
  
  /**
   * Whether to outline the alert instead of filling it
   * @default false
   */
  outline?: boolean;
}

// Helper to combine refs
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);
  
  return targetRef;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      children,
      variant = 'info',
      icon,
      showIcon = true,
      title,
      dismissible = false,
      onClose,
      autoClose = 0,
      animationDirection = 'right',
      solid = false,
      outline = false,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const alertRef = useRef<HTMLDivElement | null>(null);
    const combinedRef = useCombinedRefs(ref, alertRef);

    useEffect(() => {
      // Set mounted after a brief delay to trigger the entrance animation
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
      if (autoClose > 0) {
        const timer = setTimeout(() => handleClose(), autoClose);
        return () => clearTimeout(timer);
      }
    }, [autoClose]);
    
    const handleClose = () => {
      setClosing(true);
      // Wait for animation duration before unmounting
      setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, 500);
    };
    
    if (!visible) return null;
    
    // Default icons for each variant
    const getDefaultIcon = () => {
      if (!showIcon) return null;
      
      const iconProps = { className: "h-5 w-5" };
      
      switch (variant) {
        case 'info':
          return <Info {...iconProps} />;
        case 'success':
          return <CheckCircle {...iconProps} />;
        case 'warning':
          return <AlertTriangle {...iconProps} />;
        case 'danger':
          return <XCircle {...iconProps} />;
        default:
          return <AlertCircle {...iconProps} />;
      }
    };
    
    // Animation classes based on direction
    const getAnimationClasses = () => {
      // Entry animations (swipe in)
      const entryAnimations = {
        left: 'translate-x-0 opacity-100',
        right: 'translate-x-0 opacity-100',
        top: 'translate-y-0 opacity-100',
        bottom: 'translate-y-0 opacity-100',
      };

      // Exit animations (swipe out)
      const exitAnimations = {
        left: '-translate-x-full opacity-0',
        right: 'translate-x-full opacity-0',
        top: '-translate-y-full opacity-0',
        bottom: 'translate-y-full opacity-0',
      };
      
      // Initial positions (before animation starts)
      const initialPositions = {
        left: 'translate-x-[-100%] opacity-0',
        right: 'translate-x-[100%] opacity-0',
        top: 'translate-y-[-100%] opacity-0',
        bottom: 'translate-y-[100%] opacity-0',
      };

      if (!mounted) {
        return initialPositions[animationDirection];
      }
      
      return closing ? exitAnimations[animationDirection] : entryAnimations[animationDirection];
    };
    
    // Style configurations
    const styleConfig = {
      info: {
        light: 'bg-blue-100 border-l-4 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-400 dark:text-blue-200',
        solid: 'bg-blue-500 border-l-4 border-blue-700 text-white',
        outline: 'bg-transparent border border-blue-500 text-blue-700 dark:text-blue-300',
        iconColor: 'text-blue-500 dark:text-blue-400'
      },
      success: {
        light: 'bg-green-100 border-l-4 border-green-500 text-green-700 dark:bg-green-900/50 dark:border-green-400 dark:text-green-200',
        solid: 'bg-green-500 border-l-4 border-green-700 text-white',
        outline: 'bg-transparent border border-green-500 text-green-700 dark:text-green-300',
        iconColor: 'text-green-500 dark:text-green-400'
      },
      warning: {
        light: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-900/50 dark:border-yellow-400 dark:text-yellow-200',
        solid: 'bg-yellow-500 border-l-4 border-yellow-700 text-white',
        outline: 'bg-transparent border border-yellow-500 text-yellow-700 dark:text-yellow-300',
        iconColor: 'text-yellow-500 dark:text-yellow-400'
      },
      danger: {
        light: 'bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-400 dark:text-red-200',
        solid: 'bg-red-500 border-l-4 border-red-700 text-white',
        outline: 'bg-transparent border border-red-500 text-red-700 dark:text-red-300',
        iconColor: 'text-red-500 dark:text-red-400'
      }
    };
    
    // Determine which style to use
    const getStyleClasses = () => {
      if (solid) return styleConfig[variant].solid;
      if (outline) return styleConfig[variant].outline;
      return styleConfig[variant].light;
    };
    
    // Get icon color class
    const getIconColorClass = () => {
      if (solid) return 'text-white';
      return styleConfig[variant].iconColor;
    };

    return (
      <div
        ref={combinedRef}
        className={clsx(
          'loco-alert p-4 rounded relative shadow-md',
          'transition-all duration-500 ease-in-out transform',
          getAnimationClasses(),
          getStyleClasses(),
          className
        )}
        role="alert"
        {...props}
      >
        {dismissible && (
          <button
            type="button"
            onClick={handleClose}
            className={clsx(
              "absolute top-2 right-2 p-1 rounded-full hover:bg-opacity-20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
              solid ? "hover:bg-white text-white focus:ring-white" : `hover:bg-${variant}-200 focus:ring-${variant}-500`
            )}
            aria-label="Close Alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <div className="flex">
          {(icon || showIcon) && (
            <div className={clsx("mr-3 flex-shrink-0 mt-0.5", getIconColorClass())}>
              {icon || getDefaultIcon()}
            </div>
          )}
          <div className={dismissible ? 'pr-6' : ''}>
            {title && <p className="font-bold">{title}</p>}
            <div>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
