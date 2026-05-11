import clsx from 'clsx'

type SkeletonProps = React.ComponentProps<'div'>

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div className={clsx('animate-pulse rounded bg-gray-200', className)} {...props} />
)

export default Skeleton
