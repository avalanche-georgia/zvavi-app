import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export type SpinnerSize = 'lg' | 'md' | 'sm'

type SpinnerProps = {
  className?: string
  // Read out by screen readers ("Loading…"); the spinner itself is silent
  label: string
  size?: SpinnerSize
}

const sizeClasses: Record<SpinnerSize, string> = {
  lg: 'size-8',
  md: 'size-6',
  sm: 'size-4',
}

// Inline busy indicator. Place it yourself, or use LoadingState for a centred block.
const Spinner = ({ className, label, size = 'md' }: SpinnerProps) => (
  <span className={cn('text-accent inline-flex', className)} role="status">
    <LoaderCircle aria-hidden className={cn('animate-spin', sizeClasses[size])} />
    <span className="sr-only">{label}</span>
  </span>
)

export default Spinner
