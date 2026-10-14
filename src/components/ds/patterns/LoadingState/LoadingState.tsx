import { Spinner } from '../../primitives'

import { cn } from '@/lib/utils'

type LoadingStateProps = {
  className?: string
  // A whole page is loading: bigger spinner and more room around it
  isPage?: boolean
  label: string
}

// Centred spinner standing in for a block (page, panel, section) that is loading
const LoadingState = ({ className, isPage = false, label }: LoadingStateProps) => (
  <div
    className={cn(
      'flex cursor-wait items-center justify-center',
      isPage ? 'py-24' : 'py-12',
      className,
    )}
  >
    <Spinner label={label} size={isPage ? 'lg' : 'md'} />
  </div>
)

export default LoadingState
