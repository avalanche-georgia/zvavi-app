import { cn } from '@/lib/utils'

type CountBadgeProps = {
  className?: string
  count: number | undefined
}

// Number of items waiting for attention (e.g. on a nav link or tab); nothing at zero
const CountBadge = ({ className, count }: CountBadgeProps) => {
  if (!count) return null

  return (
    <span
      className={cn(
        'bg-accent text-caption inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-semibold text-white tabular-nums',
        className,
      )}
    >
      {count}
    </span>
  )
}

export default CountBadge
