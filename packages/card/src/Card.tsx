import React, { useState } from 'react';
import { clsx } from 'clsx';
import { MoreVertical } from 'lucide-react';

export interface CardAction {
  /**
   * Label for the action
   */
  label: string;
  
  /**
   * Icon component to display (optional)
   */
  icon?: React.ReactNode;
  
  /**
   * Handler for when the action is clicked
   */
  onClick: () => void;
  
  /**
   * Optional variant for styling
   */
  variant?: 'default' | 'danger';
}

export interface CardProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
  
  /**
   * Card title
   */
  title?: string;
  
  /**
   * Actions for the three-dot menu
   */
  actions?: CardAction[];
  
  /**
   * Whether to show a border
   */
  bordered?: boolean;
  
  /**
   * Whether to show a shadow
   */
  shadow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      title,
      actions = [],
      bordered = false,
      shadow = true,
      ...props
    },
    ref
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    const handleActionClick = (action: CardAction) => {
      action.onClick();
      setIsMenuOpen(false);
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'loco-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden',
          bordered && 'border border-gray-200 dark:border-gray-700',
          shadow && 'shadow-md',
          className
        )}
        {...props}
      >
        {(title || actions.length > 0) && (
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
            {actions.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action)}
                          className={clsx(
                            'w-full text-left flex items-center px-4 py-2 text-sm',
                            action.variant === 'danger' 
                              ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
                          )}
                          role="menuitem"
                        >
                          {action.icon && <span className="mr-2">{action.icon}</span>}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div className={clsx(!title && !actions.length && 'p-4')}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
