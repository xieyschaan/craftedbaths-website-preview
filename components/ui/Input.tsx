'use client'

import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-gilroy font-medium text-neutral-700 mb-2"
          >
            {label}
            {props.required && <span className="text-accent-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 font-gilroy text-base',
            'border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-neutral-300 focus:border-primary-900 focus:ring-primary-500',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            'placeholder:text-neutral-400',
            className
          )}
          {...props}
        />
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

Input.displayName = 'Input'

export default Input

