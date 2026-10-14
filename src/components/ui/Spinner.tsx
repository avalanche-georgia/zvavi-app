import type { Size } from '@components/types'
import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const iconClassBySize: Record<Size, string> = {
  lg: 'size-8',
  md: 'size-6',
  sm: 'size-4',
}

const labelClassBySize: Record<Size, string> = {
  lg: 'text-base',
  md: 'text-sm',
  sm: 'text-xs',
}

type SpinnerProps = {
  size?: Size
  label?: string
} & React.ComponentProps<'svg'>

/** @deprecated Use `Spinner` from `@ds/primitives` or `LoadingState` from `@ds/patterns` — see DESIGN_SYSTEM.md */
const Spinner = ({ label, size = 'md', ...props }: SpinnerProps) => (
  <div className="absolute top-1/2 left-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 cursor-wait flex-col items-center justify-center gap-2">
    <LoaderIcon
      aria-label="Loading"
      className={cn('text-primary animate-spin', iconClassBySize[size])}
      role="status"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />

    {label && <p className={cn('text-gray-400', labelClassBySize[size])}>{label}</p>}
  </div>
)

export default Spinner
