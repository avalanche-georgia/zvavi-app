'use client'

import { Menu } from '@base-ui/react/menu'
import type { IconProps } from '@components/icons'
import clsx from 'clsx'
import { Icon } from 'src/components'

const DropdownMenu = Menu.Root

const DropdownMenuTrigger = Menu.Trigger

type DropdownMenuContentProps = {
  align?: 'center' | 'end' | 'start'
  children: React.ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  sideOffset?: number
}

const DropdownMenuContent = ({
  align = 'end',
  children,
  side = 'bottom',
  sideOffset = 4,
}: DropdownMenuContentProps) => (
  <Menu.Portal>
    <Menu.Positioner align={align} side={side} sideOffset={sideOffset}>
      <Menu.Popup
        className={clsx(
          'z-50 min-w-40 overflow-hidden rounded-lg p-2',
          'bg-white shadow-lg ring-1 ring-black/5 outline-hidden',
          'data-open:animate-[fadeIn_150ms_ease-out,scaleIn_150ms_ease-out]',
          'data-closed:animate-[fadeOut_100ms_ease-in,scaleOut_100ms_ease-in]',
        )}
      >
        {children}
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
)

type DropdownMenuItemProps = {
  children: React.ReactNode
  className?: string
  closeOnClick?: boolean
  disabled?: boolean
  iconProps?: IconProps
  onClick?: React.MouseEventHandler<HTMLElement>
  render?: React.ReactElement
}

const DropdownMenuItem = ({
  children,
  className,
  closeOnClick = true,
  disabled,
  iconProps,
  onClick,
  render,
}: DropdownMenuItemProps) => (
  <Menu.Item
    className={clsx(
      'flex h-9 w-full cursor-default items-center gap-2 rounded-lg px-3',
      'text-sm text-gray-700 outline-hidden transition-colors select-none',
      'data-highlighted:bg-gray-100',
      'data-disabled:pointer-events-none data-disabled:opacity-40',
      className,
    )}
    closeOnClick={closeOnClick}
    disabled={disabled}
    onClick={onClick}
    render={render}
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {iconProps && <Icon size="sm" {...iconProps} />}
    {children}
  </Menu.Item>
)

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger }
