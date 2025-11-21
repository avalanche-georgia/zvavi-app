import type { IconName } from '@/UI/components/icons'

export type NavMenuItem = {
  icon: IconName
  id: string
  isHidden?: boolean
  path: string
  titleId: string
}
