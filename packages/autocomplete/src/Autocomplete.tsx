import React, { useState, useEffect, useRef, useMemo } from 'react';
import { clsx } from 'clsx';
import { Search, X, Check, ChevronDown } from 'lucide-react';

// Type for basic option structure
export type AutocompleteOption = {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
  [key: string]: any;
};

export interface AutocompleteProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Input placeholder
   */
  placeholder?: string;
  
  /**
   * Options to select from
   */
  options?: AutocompleteOption[];
  
  /**
   * Function to load options asynchronously
   */
  loadOptions?: (inputValue: string) => Promise<AutocompleteOption[]>;
  
  /**
   * Debounce time in ms for async search
   * @default 300
   */
  debounceTime?: number;
  
  /**
   * Callback when value changes
   */
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void;
  
  /**
   * Current selected value
   */
  value?: AutocompleteOption | AutocompleteOption[] | null;
  
  /**
   * Default value when uncontrolled
   */
  defaultValue?: AutocompleteOption | AutocompleteOption[] | null;
  
  /**
   * Whether the autocomplete allows multiple selection
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the component has an error
   * @default false
   */
  error?: boolean;
  
  /**
   * Error message to display
   */
  errorMessage?: string;
  
  /**
   * Helper text to display
   */
  helperText?: string;
  
  /**
   * Label for the autocomplete
   */
  label?: string;
  
  /**
   * Whether options should be grouped by the group property
   * @default false
   */
  groupBy?: boolean;
  
  /**
   * Custom function to render each option
   */
  renderOption?: (option: AutocompleteOption, state: { selected: boolean; active: boolean }) => React.ReactNode;
  
  /**
   * Whether the dropdown should close when an option is selected
   * Only applies to multiple selection mode
   * @default false
   */
  closeOnSelect?: boolean;
  
  /**
   * Maximum number of tags to show when in multiple mode
   * @default 5
   */
  maxTagCount?: number;
  
  /**
   * Whether to show a clear button
   * @default true
   */
  clearable?: boolean;
  
  /**
   * Name of the input element
   */
  name?: string;
  
  /**
   * Callback when the input is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Callback when the input is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Whether to show loading state during async operations
   * @default false
   */
  loading?: boolean;
  
  /**
   * Minimum characters to start search
   * @default 1
   */
  minChars?: number;
  
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Text to display when no options match
   * @default 'No options found'
   */
  noOptionsMessage?: string;
  
  /**
   * Whether the dropdown should be full width
   * @default true
   */
  fullWidth?: boolean;
  
  /**
   * ARIA label for the autocomplete
   */
  'aria-label'?: string;
}

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      className,
      placeholder = 'Search...',
      options = [],
      loadOptions,
      debounceTime = 300,
      onChange,
      value,
      defaultValue,
      multiple = false,
      disabled = false,
      error = false,
      errorMessage,
      helperText,
      label,
      groupBy = false,
      renderOption,
      closeOnSelect = false,
      maxTagCount = 5,
      clearable = true,
      name,
      onBlur,
      onFocus,
      loading: externalLoading = false,
      minChars = 1,
      size = 'md',
      noOptionsMessage = 'No options found',
      fullWidth = true,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const [internalValue, setInternalValue] = useState<AutocompleteOption | AutocompleteOption[] | null>(defaultValue || (multiple ? [] : null));
    const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(options);
    const [loading, setLoading] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    // Determine if component is controlled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    
    // Manage option filtering and async loading
    useEffect(() => {
      if (!loadOptions) {
        // Local filtering
        const filtered = options.filter(option => 
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
      }
    }, [options, inputValue, loadOptions]);
    
    // Handle async option loading
    const handleAsyncSearch = async (query: string) => {
      if (!loadOptions || query.length < minChars) return;
      
      // Clear any existing timers
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Set new timer for debounce
      debounceTimerRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await loadOptions(query);
          setFilteredOptions(results);
        } catch (error) {
          console.error('Error loading options:', error);
        } finally {
          setLoading(false);
        }
      }, debounceTime);
    };
    
    // Input change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setInputValue(query);
      
      if (loadOptions) {
        handleAsyncSearch(query);
      }
      
      if (query && !isOpen) {
        setIsOpen(true);
      }
      
      // Reset active index when query changes
      setActiveIndex(-1);
    };
    
    // Selection handlers
    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return;

      if (multiple) {
        const isArray = Array.isArray(currentValue);
        const currentValueArray = isArray ? currentValue : [];
        
        const isSelected = currentValueArray.some(item => item.value === option.value);
        
        let newValue: AutocompleteOption[];
        
        if (isSelected) {
          newValue = currentValueArray.filter(item => item.value !== option.value);
        } else {
          newValue = [...currentValueArray, option];
        }
        
        if (!isControlled) {
          setInternalValue(newValue);
        }
        
        onChange?.(newValue);
        
        // In multiple mode, we don't close the dropdown unless specified
        if (!closeOnSelect) {
          inputRef.current?.focus();
        } else {
          setIsOpen(false);
        }
      } else {
        // Single selection mode
        if (!isControlled) {
          setInternalValue(option);
        }
        
        onChange?.(option);
        setInputValue('');
        setIsOpen(false);
      }
    };
    
    // Clear selection
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (!isControlled) {
        setInternalValue(multiple ? [] : null);
      }
      
      onChange?.(multiple ? [] : null);
      setInputValue('');
      inputRef.current?.focus();
    };
    
    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen && e.key === 'ArrowDown') {
        setIsOpen(true);
        return;
      }
      
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
          
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && filteredOptions[activeIndex]) {
            handleSelect(filteredOptions[activeIndex]);
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
          
        case 'Tab':
          setIsOpen(false);
          break;
          
        default:
          break;
      }
    };
    
    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current && 
          !containerRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
    
    // Scroll active item into view
    useEffect(() => {
      if (activeIndex >= 0 && dropdownRef.current) {
        const activeItem = dropdownRef.current.querySelector(`[data-index="${activeIndex}"]`);
        if (activeItem) {
          activeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }, [activeIndex]);
    
    // Reset component if options change
    useEffect(() => {
      setFilteredOptions(options);
      setActiveIndex(-1);
    }, [options]);
    
    // Remove tag in multiple mode
    const removeTag = (e: React.MouseEvent, optionToRemove: AutocompleteOption) => {
      e.stopPropagation();
      
      if (multiple && Array.isArray(currentValue)) {
        const newValue = currentValue.filter(
          option => option.value !== optionToRemove.value
        );
        
        if (!isControlled) {
          setInternalValue(newValue);
        }
        
        onChange?.(newValue);
      }
    };
    
    // Group options if needed
    const groupedOptions = useMemo(() => {
      if (!groupBy) return { ungrouped: filteredOptions };
      
      return filteredOptions.reduce((acc, option) => {
        const group = option.group || 'ungrouped';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(option);
        return acc;
      }, {} as Record<string, AutocompleteOption[]>);
    }, [filteredOptions, groupBy]);
    
    // Determine if anything is selected
    const hasValue = multiple 
      ? Array.isArray(currentValue) && currentValue.length > 0
      : currentValue !== null;
      
    // Calculate size classes
    const sizeClasses = {
      sm: {
        container: 'text-sm',
        input: 'py-1 px-2',
        tag: 'py-0 px-1 text-xs'
      },
      md: {
        container: 'text-base',
        input: 'py-2 px-3',
        tag: 'py-0.5 px-2 text-xs'
      },
      lg: {
        container: 'text-lg',
        input: 'py-2.5 px-4',
        tag: 'py-1 px-2 text-sm'
      }
    };
    
    // Render selected tags in multiple mode
    const renderTags = () => {
      if (!multiple || !Array.isArray(currentValue) || currentValue.length === 0) {
        return null;
      }
      
      const tagsToShow = currentValue.slice(0, maxTagCount);
      const remaining = currentValue.length - tagsToShow.length;
      
      return (
        <div className="flex flex-wrap gap-1 items-center">
          {tagsToShow.map((option) => (
            <span
              key={option.value.toString()}
              className={clsx(
                'inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900',
                'text-blue-700 dark:text-blue-300',
                sizeClasses[size].tag
              )}
            >
              {option.label}
              <button
                type="button"
                onClick={(e) => removeTag(e, option)}
                className="ml-1 text-blue-500 hover:text-blue-700 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {remaining > 0 && (
            <span className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded py-0.5 px-2 text-xs">
              +{remaining} more
            </span>
          )}
        </div>
      );
    };
    
    // Render an option
    const renderOptionItem = (option: AutocompleteOption, index: number) => {
      const isSelected = multiple && Array.isArray(currentValue)
        ? currentValue.some(item => item.value === option.value)
        : !multiple && currentValue !== null && currentValue.value === option.value;
        
      const isActive = index === activeIndex;
      
      if (renderOption) {
        return renderOption(option, { selected: isSelected, active: isActive });
      }
      
      return (
        <div
          key={option.value.toString()}
          data-index={index}
          className={clsx(
            'p-2 flex items-center cursor-pointer transition-colors',
            isActive && 'bg-blue-100 dark:bg-blue-900/30',
            isSelected && 'bg-blue-50 dark:bg-blue-900/20',
            option.disabled && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => handleSelect(option)}
        >
          {multiple && (
            <div className={clsx(
              'w-4 h-4 mr-2 border rounded flex items-center justify-center',
              isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
            )}>
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </div>
          )}
          <div className="flex-grow">
            {option.label}
          </div>
          {!multiple && isSelected && (
            <Check className="h-4 w-4 ml-2 text-blue-500" />
          )}
        </div>
      );
    };
    
    return (
      <div 
        ref={containerRef}
        className={clsx(
          'loco-autocomplete relative',
          fullWidth && 'w-full',
          sizeClasses[size].container,
          className
        )}
        {...props}
      >
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        
        <div 
          className={clsx(
            'flex items-center border rounded-md overflow-hidden transition-all',
            'bg-white dark:bg-gray-800',
            isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600',
            error && 'border-red-500 dark:border-red-500',
            disabled && 'bg-gray-100 dark:bg-gray-900 cursor-not-allowed opacity-75'
          )}
          onClick={() => {
            if (!disabled) {
              inputRef.current?.focus();
              setIsOpen(true);
            }
          }}
        >
          <div className="flex-1 flex flex-wrap items-center gap-1 overflow-hidden px-3 py-2">
            <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            
            {multiple ? (
              <div className="flex flex-wrap gap-1 flex-grow">
                {renderTags()}
                <input
                  ref={inputRef}
                  type="text"
                  className={clsx(
                    'outline-none flex-grow min-w-[80px] bg-transparent',
                    disabled && 'cursor-not-allowed'
                  )}
                  placeholder={hasValue ? '' : placeholder}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={(e) => {
                    setIsFocused(true);
                    onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    setIsFocused(false);
                    setIsTouched(true);
                    onBlur?.(e);
                  }}
                  disabled={disabled}
                  name={name}
                  aria-label={ariaLabel || label || placeholder}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-autocomplete="list"
                  aria-controls="autocomplete-options"
                />
              </div>
            ) : (
              <>
                {currentValue && !inputValue ? (
                  <div className="flex-grow truncate">{(currentValue as AutocompleteOption).label}</div>
                ) : (
                  <input
                    ref={inputRef}
                    type="text"
                    className={clsx(
                      'outline-none flex-grow bg-transparent',
                      disabled && 'cursor-not-allowed'
                    )}
                    placeholder={hasValue ? '' : placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={(e) => {
                      setIsFocused(true);
                      onFocus?.(e);
                    }}
                    onBlur={(e) => {
                      setIsFocused(false);
                      setIsTouched(true);
                      onBlur?.(e);
                    }}
                    disabled={disabled}
                    name={name}
                    aria-label={ariaLabel || label || placeholder}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-autocomplete="list"
                    aria-controls="autocomplete-options"
                  />
                )}
              </>
            )}
          </div>
          
          <div className="flex-shrink-0 flex items-center">
            {clearable && hasValue && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            <div 
              className={clsx(
                'p-2 flex items-center',
                disabled ? 'text-gray-400' : 'text-gray-500'
              )}
            >
              {loading || externalLoading ? (
                <div className="h-4 w-4 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
              ) : (
                <ChevronDown className={clsx(
                  'h-4 w-4 transition-transform duration-200',
                  isOpen && 'transform rotate-180'
                )} />
              )}
            </div>
          </div>
        </div>
        
        {/* Error message */}
        {error && errorMessage && isTouched && (
          <div className="mt-1 text-sm text-red-600 dark:text-red-500">{errorMessage}</div>
        )}
        
        {/* Helper text */}
        {helperText && !error && (
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</div>
        )}
        
        {/* Dropdown */}
        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto"
            id="autocomplete-options"
            role="listbox"
          >
            {Object.entries(groupedOptions).map(([group, groupOptions]) => (
              <React.Fragment key={group}>
                {groupBy && group !== 'ungrouped' && (
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                    {group}
                  </div>
                )}
                {groupOptions.length > 0 ? (
                  groupOptions.map((option, index) => renderOptionItem(
                    option, 
                    groupBy 
                      ? filteredOptions.findIndex(o => o.value === option.value)
                      : index
                  ))
                ) : (
                  <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                    {noOptionsMessage}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
