import classnames from 'classnames'
import { LoaderIcon } from 'lucide-react'

import type { Size } from '@/UI/types'

const iconClassBySize: Record<Size, string> = {
  lg: 'size-8',
  md: 'size-6',
  sm: 'size-4',
}

type SpinnerProps = {
  size?: Size
} & React.ComponentProps<'svg'>

const Spinner = ({ className, size = 'md', ...props }: SpinnerProps) => (
  <div className="absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 cursor-wait flex-col items-center justify-center gap-1">
    <LoaderIcon
      aria-label="Loading"
      className={classnames('animate-spin text-primary', iconClassBySize[size], className)}
      role="status"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  </div>
)

export default Spinner
