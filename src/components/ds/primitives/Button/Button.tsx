import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ButtonVariant =
  | 'danger'
  | 'disclosure'
  | 'inverse'
  | 'overlay'
  | 'primary'
  | 'secondary'
  | 'text'
export type ButtonSize = 'lg' | 'md' | 'sm'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // secondary: accent border while it narrows something down, e.g. an applied filter
  isActive?: boolean
  isBusy?: boolean
  ref?: React.Ref<HTMLButtonElement>
  size?: ButtonSize
  variant?: ButtonVariant
}

// primary: the one main action of a footer / bar. secondary: every other boxed
// action. danger: confirms a destructive action (Remove, Discard, Delete).
// text: inline link-style action inside content. disclosure: shows / hides more of the content
// in place (Read more), so it reads as part of the text, not as a link. inverse: secondary action
// on a dark (ink) surface.
const variantClasses: Record<ButtonVariant, string> = {
  danger: 'rounded-field bg-danger text-white hover:bg-danger/90',
  disclosure:
    'relative text-ink underline decoration-rule-strong underline-offset-3 after:absolute pointer-coarse:after:-inset-x-1 pointer-coarse:after:-inset-y-1.5 hover:decoration-ink',
  inverse: 'rounded-field border border-white/25 text-white hover:bg-white/10',
  overlay: 'rounded-control bg-surface text-ink shadow-overlay hover:bg-tile',
  primary: 'rounded-field bg-primary text-white hover:bg-primary-hover',
  secondary: 'rounded-field border border-rule bg-surface text-ink hover:bg-tile',
  // Inline link-style action; on touch screens the ::after grows short text to a 44px target
  text: 'relative text-accent after:absolute pointer-coarse:after:-inset-x-1 pointer-coarse:after:-inset-y-1.5 hover:text-accent-hover',
}

// Inline variants size like text; the others are boxes
const inlineVariants: ButtonVariant[] = ['disclosure', 'text']

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

type ButtonClassesOptions = {
  className?: string
  isActive?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

// The button look for elements that aren't <button>, e.g. a router link that reads as a call to action
export const getButtonClasses = ({
  className,
  isActive = false,
  size = 'md',
  variant = 'primary',
}: ButtonClassesOptions = {}) =>
  cn(
    'focus-ring inline-flex shrink-0 items-center justify-center gap-2 font-semibold transition-colors select-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    inlineVariants.includes(variant) ? textSizeClasses[size] : boxSizeClasses[size],
    variantClasses[variant],
    isActive && 'border-accent',
    className,
  )

const Button = ({
  children,
  className,
  disabled,
  isActive,
  isBusy = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    aria-busy={isBusy || undefined}
    className={getButtonClasses({ className, isActive, size, variant })}
    disabled={disabled || isBusy}
    type={type}
  >
    {/* Spinner's icon, without its status role: aria-busy says it */}
    {isBusy && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
    {children}
  </button>
)

export default Button
