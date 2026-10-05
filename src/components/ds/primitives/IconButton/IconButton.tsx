import { Tooltip } from '../Tooltip'

import { cn } from '@/lib/utils'

export type IconButtonSize = 'md' | 'sm'
export type IconButtonTone = 'danger' | 'default'

type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  // Icon-only: the accessible name is required
  'aria-label': string
  ref?: React.Ref<HTMLButtonElement>
  size?: IconButtonSize
  tone?: IconButtonTone
  // Shorter hover label when the accessible name is long (defaults to aria-label)
  tooltip?: string
}

const sizeClasses: Record<IconButtonSize, string> = {
  md: 'size-10',
  sm: 'size-9',
}

const toneClasses: Record<IconButtonTone, string> = {
  // Quiet until hovered, then red — for secondary destructive actions (unlink)
  danger: 'text-muted hover:bg-danger/10 hover:text-danger',
  default: 'text-ink hover:bg-tile',
}

// Square icon-only button. On touch screens the ::after grows it to a 44px target.
// Its accessible name doubles as a tooltip (hover / keyboard focus).
const IconButton = ({
  children,
  className,
  size = 'sm',
  tone = 'default',
  tooltip,
  type = 'button',
  ...props
}: IconButtonProps) => (
  <Tooltip label={tooltip ?? props['aria-label']}>
    <button
      {...props}
      className={cn(
        'focus-ring rounded-control relative inline-grid shrink-0 place-items-center transition-colors',
        'after:absolute pointer-coarse:after:-inset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      type={type}
    >
      {children}
    </button>
  </Tooltip>
)

export default IconButton
