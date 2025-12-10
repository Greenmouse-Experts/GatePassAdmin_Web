import { cn } from '../../lib/utils'
import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = ({
  className,
  label,
  id,
  ...props
}: CheckboxProps) => {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex items-center">
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-gray-300 text-[#165757] focus:ring-2 focus:ring-[#165757] focus:ring-offset-2 cursor-pointer',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = ({ className, label, id, ...props }: RadioProps) => {
  const radioId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex items-center">
      <input
        id={radioId}
        type="radio"
        className={cn(
          'h-4 w-4 border-gray-300 text-[#165757] focus:ring-2 focus:ring-[#165757] focus:ring-offset-2 cursor-pointer',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={radioId}
          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  )
}
