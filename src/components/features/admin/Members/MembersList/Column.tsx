import clsx from 'clsx'

type ColumnProps = {
  children: React.ReactNode
  className?: string
}

const Column = ({ children, className }: ColumnProps) => (
  <div className={clsx('w-40 shrink-0', className)}>{children}</div>
)

export default Column
