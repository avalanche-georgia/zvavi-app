import clsx from 'clsx'
import { LoaderIcon } from 'lucide-react'

import type { Size } from '@/UI/types'

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

const Spinner = ({ label, size = 'md', ...props }: SpinnerProps) => (
  <div className="absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 cursor-wait flex-col items-center justify-center gap-2">
    <LoaderIcon
      aria-label="Loading"
      className={clsx('animate-spin text-primary', iconClassBySize[size])}
      role="status"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />

    {label && <p className={clsx('text-gray-400', labelClassBySize[size])}>{label}</p>}
  </div>
)

export default Spinner
