import { Link } from 'src/i18n/navigation'

import { cn } from '@/lib/utils'

type ForecastNavLinkProps = {
  children: React.ReactNode
  // null: there is no forecast in this direction
  href: string | null
  label: string
}

const boxClasses =
  'border-rule bg-surface rounded-control relative grid size-10 shrink-0 place-items-center border'

// Square arrow link to the previous / next forecast
const ForecastNavLink = ({ children, href, label }: ForecastNavLinkProps) => {
  if (href === null) {
    return (
      <span aria-disabled aria-label={label} className={cn(boxClasses, 'opacity-30')} role="link">
        {children}
      </span>
    )
  }

  return (
    <Link
      aria-label={label}
      className={cn(
        boxClasses,
        'focus-ring hover:bg-tile transition-colors after:absolute pointer-coarse:after:-inset-0.5',
      )}
      href={href}
      title={label}
    >
      {children}
    </Link>
  )
}

export default ForecastNavLink
