import { cn } from '@/lib/utils'

// Placeholder for content that is still loading; size and shape it with className
// (`h-4 w-24`, `size-8 rounded-full`). Decorative — the surrounding region says it's busy.
const Skeleton = ({ className }: { className?: string }) => (
  <span aria-hidden className={cn('bg-tile-hover rounded-badge block animate-pulse', className)} />
)

export default Skeleton
