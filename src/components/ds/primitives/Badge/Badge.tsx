import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

// Small uppercase label, e.g. "Soon" next to a disabled option
const Badge = ({ children, className }: BadgeProps) => (
  <span
    className={cn(
      'rounded-badge bg-tile-hover text-micro text-muted inline-flex items-center px-1.5 py-0.5 font-semibold uppercase',
      className,
    )}
  >
    {children}
  </span>
)

export default Badge
