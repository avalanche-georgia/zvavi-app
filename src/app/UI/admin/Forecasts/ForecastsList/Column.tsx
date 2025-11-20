import clsx from 'clsx'

type ColumnProps = {
  children: React.ReactNode
  className?: string
}

const Column = ({ children, className }: ColumnProps) => (
  <div className={clsx('w-64', className)}>{children}</div>
)

export default Column
