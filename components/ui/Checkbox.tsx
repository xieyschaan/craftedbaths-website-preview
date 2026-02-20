'use client'

import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = id || generatedId

    return (
      <div className="w-full">
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'mt-1 h-5 w-5 border-2',
              'text-primary-900 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'transition-all duration-200',
              error
                ? 'border-red-300 focus:border-red-500'
                : 'border-neutral-300 focus:border-primary-900',
              'disabled:bg-neutral-100 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'ml-3 text-sm font-jost',
                error ? 'text-red-600' : 'text-neutral-700'
              )}
            >
              {label}
              {props.required && <span className="text-accent-500 ml-1">*</span>}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm font-jost text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox

