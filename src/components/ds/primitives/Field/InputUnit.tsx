import { cn } from '@/lib/utils'

type InputUnitProps = {
  children: React.ReactNode
  className?: string
}

// Suffix inside a text-like control ("cm", "m", a character count); the control
// needs right padding to match
const InputUnit = ({ children, className }: InputUnitProps) => (
  <span
    aria-hidden
    className={cn(
      'text-copy text-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2',
      className,
    )}
  >
    {children}
  </span>
)

export default InputUnit
