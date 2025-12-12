import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'lg',
}: BottomSheetProps) => {
  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const sizeClasses = {
    sm: 'h-[40vh]',
    md: 'h-[60vh]',
    lg: 'h-[85vh]',
    full: 'h-[95vh]',
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-out',
          sizeClasses[size],
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{
          animation: isOpen ? 'slideUp 0.5s ease-out' : 'slideDown 0.3s ease-in',
        }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  )
}

interface BottomSheetHeaderProps {
  children: ReactNode
  className?: string
}

export const BottomSheetHeader = ({ children, className }: BottomSheetHeaderProps) => {
  return (
    <div className={cn('mb-6', className)}>
      {children}
    </div>
  )
}

interface BottomSheetTitleProps {
  children: ReactNode
  className?: string
}

export const BottomSheetTitle = ({ children, className }: BottomSheetTitleProps) => {
  return (
    <h3 className={cn('text-2xl font-bold text-gray-900', className)}>
      {children}
    </h3>
  )
}

interface BottomSheetDescriptionProps {
  children: ReactNode
  className?: string
}

export const BottomSheetDescription = ({ children, className }: BottomSheetDescriptionProps) => {
  return (
    <p className={cn('text-gray-600 mt-2', className)}>
      {children}
    </p>
  )
}
