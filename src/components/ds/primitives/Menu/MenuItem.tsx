'use client'

import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/lib/utils'

export type MenuItemTone = 'danger' | 'default'

type MenuItemProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  onClick: VoidFunction
  tone?: MenuItemTone
}

const toneClasses: Record<MenuItemTone, string> = {
  danger: 'text-danger data-highlighted:bg-danger/10',
  default: 'text-ink data-highlighted:bg-tile',
}

// 38px rows; 44px on touch screens
const MenuItem = ({ children, icon, onClick, tone = 'default' }: MenuItemProps) => (
  <BaseMenu.Item
    className={cn(
      'text-copy flex h-9.5 cursor-default items-center gap-2.5 rounded-lg px-2.5 outline-hidden select-none pointer-coarse:h-11',
      '[&_svg]:size-4.5 [&_svg]:shrink-0',
      toneClasses[tone],
    )}
    onClick={onClick}
  >
    {icon}
    {children}
  </BaseMenu.Item>
)

export const MenuSeparator = () => <BaseMenu.Separator className="bg-rule -mx-1.5 my-1.5 h-px" />

export default MenuItem
