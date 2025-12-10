import { cn } from '../../lib/utils'
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export const Table = ({ className, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return <thead className={cn('bg-gray-50', className)} {...props} />
}

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn(
        'border-b border-gray-200 transition-colors hover:bg-gray-50',
        className
      )}
      {...props}
    />
  )
}

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-semibold text-gray-700 [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return (
    <td
      className={cn(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
}
