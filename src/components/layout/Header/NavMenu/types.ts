import type { IconName } from '@components/icons'

export type NavMenuItem = {
  icon: IconName
  id: string
  isHidden?: boolean
  path: string
  titleId: string
}
