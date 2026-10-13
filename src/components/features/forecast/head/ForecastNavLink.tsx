import { Tooltip } from '@ds/primitives'
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

// Square arrow link to a newer / older forecast; icon-only, so its name shows
// as a tooltip
const ForecastNavLink = ({ children, href, label }: ForecastNavLinkProps) => {
  if (href === null) {
    return (
      <span aria-disabled aria-label={label} className={cn(boxClasses, 'opacity-30')} role="link">
        {children}
      </span>
    )
  }

  return (
    <Tooltip label={label}>
      <Link
        aria-label={label}
        className={cn(
          boxClasses,
          'focus-ring hover:bg-tile transition-colors after:absolute pointer-coarse:after:-inset-0.5',
        )}
        href={href}
      >
        {children}
      </Link>
    </Tooltip>
  )
}

export default ForecastNavLink
