import React from 'react';
import { clsx } from 'clsx';

export interface TreeViewProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
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
          'loco-treeview',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TreeView.displayName = 'TreeView';

export default TreeView;
