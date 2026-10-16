import { cn } from '@/lib/utils'

type PartnerLogoProps = {
  className?: string
  logoUrl: string
  // Left out when the name is shown next to the logo: the image is then decorative
  name?: string
}

const PartnerLogo = ({ className, logoUrl, name }: PartnerLogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    alt={name ? `${name} logo` : ''}
    className={cn('size-full rounded-xl object-contain', className)}
    src={logoUrl}
  />
)

export default PartnerLogo
