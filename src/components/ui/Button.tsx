import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[#165757] text-white shadow hover:bg-[#134645] focus-visible:ring-[#165757]',
        secondary:
          'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500',
        outline:
          'border-2 border-[#165757] bg-white text-[#165757] shadow-sm hover:bg-[#165757] hover:text-white focus-visible:ring-[#165757]',
        ghost: 'text-gray-700 hover:bg-[#165757]/10 hover:text-[#165757] focus-visible:ring-[#165757]',
        danger:
          'bg-red-600 text-white shadow hover:bg-red-700 focus-visible:ring-red-600',
        success:
          'bg-[#1a8f5f] text-white shadow hover:bg-[#157a4f] focus-visible:ring-[#1a8f5f]',
        warning:
          'bg-amber-500 text-white shadow hover:bg-amber-600 focus-visible:ring-amber-500',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button = ({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
