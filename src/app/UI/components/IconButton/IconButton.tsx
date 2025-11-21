import clsx from 'clsx'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import { containerClassesBySize, type IconButtonSize, iconSizesBySize } from './constants'

import { type IconName, iconRenderers } from '@/UI/components/icons'
import type { IconProps } from '@/UI/components/icons/types'

type IconButtonProps = {
  iconProps: Omit<IconProps, 'icon'> & { icon: IconName }
  size?: IconButtonSize
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const IconButton = ({ className, disabled, iconProps, size = 'md', ...props }: IconButtonProps) => {
  const { className: iconClassName, icon } = iconProps
  const IconRenderer = iconRenderers[icon]

  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded transition-colors',
        disabled
          ? 'cursor-not-allowed stroke-gray-400'
          : 'stroke-gray-500 hover:bg-black/[0.05] hover:stroke-gray-900',
        containerClassesBySize[size],
        className,
      )}
      disabled={disabled}
      type="button"
      {...props}
    >
      <IconRenderer
        className={clsx('stroke-inherit', iconClassName)}
        size={iconSizesBySize[size]}
      />
    </button>
  )
}

export default IconButton
