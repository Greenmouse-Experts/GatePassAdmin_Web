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
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#165757]/10 text-[#165757]">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
