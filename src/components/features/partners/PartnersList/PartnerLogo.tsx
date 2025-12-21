import type { PartnerLogo as PartnerLogoType } from '@data/constants/partners'
import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'

type PartnerLogoProps = {
  className?: string
  imageSize?: Pick<ImageProps, 'height' | 'width'>
  isRounded?: boolean
  logo: PartnerLogoType
  name: string
}

const PartnerLogo = ({ className, imageSize, isRounded, logo, name }: PartnerLogoProps) => {
  const logoClassName = clsx(
    'object-contain',
    {
      'rounded-xl': isRounded,
    },
    className,
  )

  if (typeof logo === 'object' && 'src' in logo) {
    return (
      <Image
        alt={`${name} logo`}
        className={logoClassName}
        height={imageSize?.height}
        src={logo}
        width={imageSize?.width}
      />
    )
  }

  const SvgLogo = logo

  return <SvgLogo aria-label={`${name} logo`} className={logoClassName} />
}

export default PartnerLogo
