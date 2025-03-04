import React from 'react';
import { clsx } from 'clsx';

export interface FileUploadProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
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
          'loco-fileupload',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
