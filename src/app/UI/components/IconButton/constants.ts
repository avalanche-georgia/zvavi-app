import type { Size } from '@/UI/types'

export type IconButtonSize = Size

export const containerClassesBySize: Record<IconButtonSize, string> = {
  lg: 'size-8',
  md: 'size-7',
  sm: 'size-6',
}

export const iconSizesBySize: Record<IconButtonSize, number> = {
  lg: 24,
  md: 20,
  sm: 16,
}
