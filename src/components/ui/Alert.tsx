import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-900 border-gray-200',
        success:
          'bg-green-50 text-green-900 border-green-200 [&>svg]:text-green-600',
        warning:
          'bg-amber-50 text-amber-900 border-amber-200 [&>svg]:text-amber-600',
        danger: 'bg-red-50 text-red-900 border-red-200 [&>svg]:text-red-600',
        info: 'bg-blue-50 text-blue-900 border-blue-200 [&>svg]:text-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  dismissible?: boolean
  onDismiss?: () => void
  autoDismiss?: number
}

export const Alert = ({
  className,
  variant,
  dismissible,
  onDismiss,
  autoDismiss,
  children,
  ...props
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, autoDismiss)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, onDismiss])

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-md p-1 text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export const AlertTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h5
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export const AlertDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <div
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
}
