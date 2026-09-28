import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'overlay' | 'primary' | 'secondary' | 'text'
export type ButtonSize = 'lg' | 'md' | 'sm'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isBusy?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  overlay: 'rounded-control bg-surface text-ink shadow-overlay hover:bg-tile',
  primary: 'rounded-field bg-primary text-white hover:bg-primary-hover',
  secondary: 'rounded-field border border-rule bg-surface text-ink hover:bg-tile',
  // Inline link-style action; on touch screens the ::after grows short text to a 44px target
  text: 'relative text-accent after:absolute pointer-coarse:after:-inset-x-1 pointer-coarse:after:-inset-y-1.5 hover:text-accent-hover',
}

const boxSizeClasses: Record<ButtonSize, string> = {
  lg: 'h-12.5 px-6.5 text-copy-lg',
  md: 'h-11.5 px-4.5 text-copy',
  sm: 'h-10 px-3 text-copy-sm',
}

const textSizeClasses: Record<ButtonSize, string> = {
  lg: 'py-1.5 text-copy-lg',
  md: 'py-1.5 text-copy',
  sm: 'py-1.5 text-copy-sm',
}

const Button = ({
  children,
  className,
  disabled,
  isBusy = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    aria-busy={isBusy || undefined}
    className={cn(
      'focus-ring inline-flex shrink-0 items-center justify-center gap-2 font-semibold transition-colors select-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'text' ? textSizeClasses[size] : boxSizeClasses[size],
      variantClasses[variant],
      className,
    )}
    disabled={disabled || isBusy}
    type={type}
  >
    {isBusy && <LoaderIcon aria-hidden className="size-4 animate-spin" />}
    {children}
  </button>
)

export default Button
