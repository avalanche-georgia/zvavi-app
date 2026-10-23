import Image from 'next/image'

import { cn } from '@/lib/utils'

type PartnerLogoProps = {
  className?: string
  // Above the fold, where it is often the largest paint: fetched first instead of lazily
  isPreloaded?: boolean
  logoUrl: string
  // Left out when the name is shown next to the logo: the image is then decorative
  name?: string
}

// The widest slot a logo fills (the home page's main-partner feature, 5:2); the
// box sets the actual size, this only picks the resized copy to serve
const logoWidth = 280
const logoHeight = 112

const PartnerLogo = ({ className, isPreloaded = false, logoUrl, name }: PartnerLogoProps) => (
  <Image
    alt={name ? `${name} logo` : ''}
    className={cn('rounded-media size-full object-contain', className)}
    height={logoHeight}
    preload={isPreloaded}
    src={logoUrl}
    width={logoWidth}
  />
)

export default PartnerLogo
