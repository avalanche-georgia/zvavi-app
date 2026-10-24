import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export type SpinnerSize = 'lg' | 'md' | 'sm'

type SpinnerProps = {
  className?: string
  // Read out by screen readers ("Loading…"). Leave it out when the spinner is decoration and
  // something else says it's busy (aria-busy on a button)
  label?: string
  size?: SpinnerSize
}

const sizeClasses: Record<SpinnerSize, string> = {
  lg: 'size-8',
  md: 'size-6',
  sm: 'size-4',
}

// Inline busy indicator. Place it yourself, or use LoadingState for a centred block.
// The <span> spins, not the <svg>: Chrome repaints a spinning <svg> on every frame, and on such a
// busy page it now and then flashes a stale frame of any hover background mid-transition.
const Spinner = ({ className, label, size = 'md' }: SpinnerProps) => (
  <span
    aria-hidden={label ? undefined : true}
    className={cn('text-accent inline-flex', className)}
    role={label ? 'status' : undefined}
  >
    <span className="inline-flex animate-spin">
      <LoaderCircle aria-hidden className={sizeClasses[size]} />
    </span>
    {label && <span className="sr-only">{label}</span>}
  </span>
)

export default Spinner
