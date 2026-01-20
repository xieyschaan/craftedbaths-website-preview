'use client'

import { SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, options, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-gilroy font-medium text-neutral-700 mb-2"
          >
            {label}
            {props.required && <span className="text-accent-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-3 font-gilroy text-base',
            'border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'bg-white appearance-none',
            'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")] bg-[length:1.5em_1.5em] bg-[right_0.75rem_center] bg-no-repeat',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-neutral-300 focus:border-primary-900 focus:ring-primary-500',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-2 text-sm font-gilroy text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm font-gilroy text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select

