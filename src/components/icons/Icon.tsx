import FacebookIcon from '@assets/icons/brand/facebook.svg?component'
import InstagramIcon from '@assets/icons/brand/instagram.svg?component'
import clsx from 'clsx'

import { containerClassesBySize, iconSizesBySize } from './constants'

import { iconRenderers } from './icons'
import type { BrandIconName, IconName, IconProps } from './types'

const brandIconSources: Record<BrandIconName, React.ElementType> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
}
const brandIcons = Object.keys(brandIconSources)

const Icon = ({ className, icon, size = 'md' }: IconProps) => {
  const isBrand = brandIcons.includes(icon)
  const IconRenderer = isBrand
    ? brandIconSources[icon as BrandIconName]
    : iconRenderers[icon as IconName]

  return (
    <div className={clsx('flex items-center justify-center', containerClassesBySize[size])}>
      {isBrand ? (
        <IconRenderer className={className} />
      ) : (
        <IconRenderer className={className} size={iconSizesBySize[size]} />
      )}
    </div>
  )
}

export default Icon
