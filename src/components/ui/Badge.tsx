import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { HTMLAttributes } from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#165757]/10 text-[#165757] border border-[#165757]/20',
        success: 'bg-[#1a8f5f]/10 text-[#1a8f5f] border border-[#1a8f5f]/20',
        warning: 'bg-amber-100 text-amber-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-cyan-100 text-cyan-800',
        neutral: 'bg-gray-100 text-gray-800',
        purple: 'bg-purple-100 text-purple-800',
        outline: 'border border-gray-300 text-gray-700 bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
