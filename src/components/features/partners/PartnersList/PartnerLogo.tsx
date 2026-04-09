import clsx from 'clsx'

type PartnerLogoProps = {
  className?: string
  logoUrl: string
  name: string
}

const PartnerLogo = ({ className, logoUrl, name }: PartnerLogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    alt={`${name} logo`}
    className={clsx('size-full rounded-xl object-contain', className)}
    src={logoUrl}
  />
)

export default PartnerLogo
