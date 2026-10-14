import type { IconName } from '@components/icons'

export type NavMenuItemBase = {
  // Path prefixes that mark the item as the current section (defaults to its own path)
  activePaths?: string[]
  icon: IconName
  id: string
  isHidden?: boolean
  titleId: string
}

export type NavMenuLink = NavMenuItemBase & {
  children?: never
  path: string
}

export type NavMenuGroup = NavMenuItemBase & {
  children: NavMenuLink[]
  path?: never
}

export type NavMenuItem = NavMenuGroup | NavMenuLink
