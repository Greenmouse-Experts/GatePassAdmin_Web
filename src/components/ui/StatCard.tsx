import { cn } from '../../lib/utils'
import type { HTMLAttributes } from 'react'

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  ...props
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          {icon && (
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#165757]/10 text-[#165757]">
                {icon}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 pt-0.5">
              <span
                className={cn(
                  'text-sm font-semibold',
                  trend.isPositive ? 'text-[#165757]' : 'text-red-600'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
