import clsx from 'clsx'

import { containerClassesBySize, iconSizesBySize } from './constants'

import { iconRenderers } from './icons'
import type { IconProps } from './types'

const Icon = ({ className, icon, size = 'md' }: IconProps) => {
  const IconRenderer = iconRenderers[icon]

  return (
    <div className={clsx('flex items-center justify-center', containerClassesBySize[size])}>
      <IconRenderer className={className} size={iconSizesBySize[size]} />
    </div>
  )
}

export default Icon
