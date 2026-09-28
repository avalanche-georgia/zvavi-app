import { cn } from '@/lib/utils'

export type IconButtonSize = 'md' | 'sm'
export type IconButtonTone = 'danger' | 'default'

type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  // Icon-only: the accessible name is required
  'aria-label': string
  size?: IconButtonSize
  tone?: IconButtonTone
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
const IconButton = ({
  children,
  className,
  size = 'sm',
  tone = 'default',
  type = 'button',
  ...props
}: IconButtonProps) => (
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
)

export default IconButton
