import { useEffect, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative w-full mx-4 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col',
          sizeClasses[size]
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

export const ModalHeader = ({ children, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

interface ModalBodyProps {
  children: ReactNode
  className?: string
}

export const ModalBody = ({ children, className }: ModalBodyProps) => {
  return (
    <div className={cn('flex-1 overflow-y-auto p-6', className)}>
      {children}
    </div>
  )
}

interface ModalFooterProps {
  children: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50',
        className
      )}
    >
      {children}
    </div>
  )
}
