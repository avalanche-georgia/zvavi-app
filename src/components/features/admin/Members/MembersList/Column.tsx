import { cn } from '@/lib/utils'

type ColumnProps = {
  children: React.ReactNode
  className?: string
}

const Column = ({ children, className }: ColumnProps) => (
  <div className={cn('w-40 shrink-0', className)}>{children}</div>
)

export default Column
