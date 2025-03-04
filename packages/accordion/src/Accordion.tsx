import React, { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

type AccordionVariant = 'default' | 'bordered' | 'separated';
type AccordionIconType = 'chevron' | 'plus-minus' | 'custom' | 'none';

export interface AccordionItemProps {
  /**
   * Title of the accordion item
   */
  title: React.ReactNode;
  
  /**
   * Content of the accordion item
   */
  children: React.ReactNode;
  
  /**
   * If true, the accordion item will be open by default
   */
  defaultOpen?: boolean;
  
  /**
   * If true, the accordion item will be disabled
   */
  disabled?: boolean;

  /**
   * Custom icon for the accordion item
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS classes for the accordion item
   */
  className?: string;
  
  /**
   * ID for the accordion item
   */
  id?: string;
}

export interface AccordionProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements (AccordionItem components)
   */
  children?: React.ReactNode;
  
  /**
   * Visual variant of the accordion
   * @default 'default'
   */
  variant?: AccordionVariant;
  
  /**
   * Type of icon to display for accordion items
   * @default 'chevron'
   */
  iconType?: AccordionIconType;
  
  /**
   * If true, multiple accordion items can be expanded at the same time
   * @default false
   */
  allowMultiple?: boolean;
  
  /**
   * If true, all accordion items can be closed
   * @default true
   */
  allowAllClosed?: boolean;
  
  /**
   * If true, the accordion items will animate when opening/closing
   * @default true
   */
  animate?: boolean;
  
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;
  
  /**
   * Index or indices of the items that should be open initially
   * Only used when component is controlled
   */
  openItems?: number[] | number;
  
  /**
   * Handler for when an item is toggled
   */
  onItemToggle?: (index: number, isOpen: boolean) => void;
}

const AccordionContext = React.createContext<{
  variant: AccordionVariant;
  iconType: AccordionIconType;
  animate: boolean;
  animationDuration: number;
  isItemOpen: (index: number) => boolean;
  toggleItem: (index: number) => void;
  registerItem: (defaultOpen: boolean) => number;
}>({
  variant: 'default',
  iconType: 'chevron',
  animate: true,
  animationDuration: 300,
  isItemOpen: () => false,
  toggleItem: () => {},
  registerItem: () => 0,
});

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      title,
      children,
      defaultOpen = false,
      disabled = false,
      icon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const {
      variant,
      iconType,
      animate,
      animationDuration,
      isItemOpen,
      toggleItem,
      registerItem,
    } = React.useContext(AccordionContext);
    
    const [height, setHeight] = useState<number | 'auto'>(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState<number | null>(null);
    
    useEffect(() => {
      if (index === null) {
        setIndex(registerItem(defaultOpen));
      }
    }, [defaultOpen, index, registerItem]);
    
    const open = index !== null ? isItemOpen(index) : false;
    
    useEffect(() => {
      if (!animate) return;
      
      if (open) {
        const contentHeight = contentRef.current?.scrollHeight || 0;
        setHeight(contentHeight);
        const timer = setTimeout(() => setHeight('auto'), animationDuration);
        return () => clearTimeout(timer);
      } else {
        if (contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight;
          setHeight(contentHeight);
          // Force a reflow
          contentRef.current.offsetHeight;
          setHeight(0);
        }
      }
    }, [open, animate, animationDuration]);
    
    const handleClick = () => {
      if (disabled || index === null) return;
      toggleItem(index);
    };
    
    const getIcon = () => {
      if (icon) return icon;
      
      if (iconType === 'chevron') {
        return open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />;
      }
      
      if (iconType === 'plus-minus') {
        return open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />;
      }
      
      return null;
    };
    
    const getVariantClasses = () => {
      if (variant === 'bordered') {
        return [
          'border border-gray-200 dark:border-gray-700',
          open ? 'bg-gray-50 dark:bg-gray-800/50' : '',
        ];
      }
      
      if (variant === 'separated') {
        return [
          'border border-gray-200 dark:border-gray-700 mb-2 rounded',
        ];
      }
      
      return [
        'border-t border-gray-200 dark:border-gray-700',
        'first:border-t-0 last:border-b',
      ];
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'loco-accordion-item',
          disabled && 'opacity-60 cursor-not-allowed',
          getVariantClasses(),
          className
        )}
        {...props}
        id={id}
      >
        <h3>
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={clsx(
              'flex justify-between items-center w-full text-left px-4 py-3',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              'text-gray-900 dark:text-white font-medium'
            )}
            aria-expanded={open}
            aria-disabled={disabled}
            aria-controls={`accordion-content-${index}`}
            id={`accordion-header-${index}`}
          >
            <span>{title}</span>
            {iconType !== 'none' && (
              <span className="ml-2 flex-shrink-0 text-gray-500 dark:text-gray-400">
                {getIcon()}
              </span>
            )}
          </button>
        </h3>
        <div
          className={clsx(
            'overflow-hidden transition-all',
            !animate && (open ? 'block' : 'hidden')
          )}
          style={animate ? { height: height === 'auto' ? 'auto' : `${height}px`, transitionDuration: `${animationDuration}ms` } : {}}
          ref={contentRef}
          id={`accordion-content-${index}`}
          role="region"
          aria-labelledby={`accordion-header-${index}`}
        >
          <div className="px-4 py-3">{children}</div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      children,
      variant = 'default',
      iconType = 'chevron',
      allowMultiple = false,
      allowAllClosed = true,
      animate = true,
      animationDuration = 300,
      openItems,
      onItemToggle,
      ...props
    },
    ref
  ) => {
    // Track if component is controlled or uncontrolled
    const isControlled = openItems !== undefined;
    
    // For uncontrolled mode
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const [itemCount, setItemCount] = useState(0);
    
    // Convert openItems to array if it's a number
    const normalizedOpenItems = React.useMemo(() => {
      if (openItems === undefined) return [];
      return Array.isArray(openItems) ? openItems : [openItems];
    }, [openItems]);
    
    const isItemOpen = useCallback(
      (index: number) => {
        const openIndicesArray = isControlled ? normalizedOpenItems : openIndices;
        return openIndicesArray.includes(index);
      },
      [isControlled, normalizedOpenItems, openIndices]
    );
    
    const toggleItem = useCallback(
      (index: number) => {
        if (isControlled) {
          onItemToggle?.(index, !normalizedOpenItems.includes(index));
          return;
        }
        
        setOpenIndices(prev => {
          const isOpen = prev.includes(index);
          
          // When closing an item
          if (isOpen) {
            // If allowAllClosed is false and this is the only open item, don't close it
            if (!allowAllClosed && prev.length === 1) {
              return prev;
            }
            
            const newIndices = prev.filter(i => i !== index);
            onItemToggle?.(index, false);
            return newIndices;
          } 
          
          // When opening an item
          if (!allowMultiple) {
            // Close all other items if multiple aren't allowed
            onItemToggle?.(index, true);
            return [index];
          }
          
          const newIndices = [...prev, index];
          onItemToggle?.(index, true);
          return newIndices;
        });
      },
      [isControlled, normalizedOpenItems, allowMultiple, allowAllClosed, onItemToggle]
    );
    
    const registerItem = useCallback((defaultOpen: boolean) => {
      const newIndex = itemCount;
      setItemCount(prev => prev + 1);
      
      // Set this item to open by default if specified (only in uncontrolled mode)
      if (defaultOpen && !isControlled) {
        setOpenIndices(prev => {
          if (!allowMultiple) return [newIndex];
          return [...prev, newIndex];
        });
      }
      
      return newIndex;
    }, [itemCount, isControlled, allowMultiple]);
    
    const accordionContextValue = React.useMemo(
      () => ({
        variant,
        iconType,
        animate,
        animationDuration,
        isItemOpen,
        toggleItem,
        registerItem,
      }),
      [
        variant,
        iconType,
        animate,
        animationDuration,
        isItemOpen,
        toggleItem,
        registerItem,
      ]
    );
    
    return (
      <AccordionContext.Provider value={accordionContextValue}>
        <div
          ref={ref}
          className={clsx(
            'loco-accordion',
            variant === 'separated' ? 'space-y-2' : 'rounded overflow-hidden',
            variant === 'default' && 'border border-gray-200 dark:border-gray-700',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// Compound component pattern
Accordion.Item = AccordionItem;

export default Accordion;
