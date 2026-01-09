import { type IconName, type IconProps, iconRenderers } from '@components/icons'
import clsx from 'clsx'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Link, type LinkProps } from 'src/i18n/navigation'
import { twMerge } from 'tailwind-merge'

import { containerClassesBySize, type IconButtonSize, iconSizesBySize } from './constants'

type BaseProps = {
  iconProps: Omit<IconProps, 'icon'> & { icon: IconName }
  size?: IconButtonSize
}

type ButtonProps = BaseProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    href?: never
  }

type LinkButtonProps = BaseProps & LinkProps

type IconButtonProps = ButtonProps | LinkButtonProps

const IconButton = ({ className, iconProps, size = 'md', ...props }: IconButtonProps) => {
  const { className: iconClassName, icon } = iconProps
  const IconRenderer = iconRenderers[icon]
  const isLink = 'href' in props && props.href !== undefined

  const sharedClassName = twMerge(
    clsx(
      'flex items-center justify-center rounded transition-colors',
      'disabled' in props && props.disabled
        ? 'cursor-not-allowed stroke-gray-400'
        : 'stroke-gray-500 hover:stroke-gray-900 lg:hover:bg-black/[0.05]',
      containerClassesBySize[size],
      className,
    ),
  )

  const iconElement = (
    <IconRenderer className={clsx('stroke-inherit', iconClassName)} size={iconSizesBySize[size]} />
  )

  if (isLink) {
    const { href } = props as LinkButtonProps

    return (
      <Link className={sharedClassName} href={href}>
        {iconElement}
      </Link>
    )
  }

  const { disabled, onClick } = props as ButtonProps

  return (
    <button className={sharedClassName} disabled={disabled} onClick={onClick} type="button">
      {iconElement}
    </button>
  )
}

export default IconButton
