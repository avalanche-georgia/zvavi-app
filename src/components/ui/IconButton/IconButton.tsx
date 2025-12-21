import { type IconName, type IconProps, iconRenderers } from '@components/icons'
import clsx from 'clsx'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { containerClassesBySize, type IconButtonSize, iconSizesBySize } from './constants'

type IconButtonProps = {
  iconProps: Omit<IconProps, 'icon'> & { icon: IconName }
  size?: IconButtonSize
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const IconButton = ({ className, disabled, iconProps, size = 'md', ...props }: IconButtonProps) => {
  const { className: iconClassName, icon } = iconProps
  const IconRenderer = iconRenderers[icon]

  return (
    <button
      className={twMerge(
        clsx(
          'flex items-center justify-center rounded transition-colors',
          disabled
            ? 'cursor-not-allowed stroke-gray-400'
            : 'stroke-gray-500 hover:stroke-gray-900 lg:hover:bg-black/[0.05]',
          containerClassesBySize[size],
          className,
        ),
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
