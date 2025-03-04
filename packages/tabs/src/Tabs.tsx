import React from 'react';
import { clsx } from 'clsx';

export interface TabProps {
  title: string;
  children: React.ReactNode;
}

export interface TabsProps {
  children: React.ReactElement<TabProps>[];
  className?: string;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
      <div ref={ref} className={clsx('loco-tabs', className)} {...props}>
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          {React.Children.map(children, (child, index) => (
            <button
              key={index}
              className={clsx(
                'px-4 py-2 font-medium text-sm focus:outline-none',
                activeTab === index
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              )}
              onClick={() => setActiveTab(index)}
            >
              {child.props.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {children[activeTab]}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
Tabs.Tab = Tab;

export default Tabs;
