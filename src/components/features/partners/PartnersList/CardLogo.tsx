import PartnerLogo from './PartnerLogo'

import { cn } from '@/lib/utils'

type CardLogoProps = {
  // Size and radius
  className: string
  logoUrl: string
}

// Logo in a white bordered box, so every logo reads on the same background.
// Decorative: the partner's name is always shown next to it.
const CardLogo = ({ className, logoUrl }: CardLogoProps) => (
  <span className={cn('bg-surface border-rule block shrink-0 overflow-hidden border', className)}>
    <PartnerLogo className="rounded-none" logoUrl={logoUrl} />
  </span>
)

export default CardLogo
