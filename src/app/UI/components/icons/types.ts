import type { Size } from '@/UI/types'

export type IconName =
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'externalLink'
  | 'eye'
  | 'eyeOff'
  | 'handshake'
  | 'info'
  | 'mail'
  | 'menu'
  | 'mountainSnow'
  | 'pencil'
  | 'plus'
  | 'snowflake'
  | 'trash'
  | 'userPlus'
  | 'users'
  | 'xMark'

type IconSize = Size

export type IconProps = {
  className?: string
  icon: IconName
  size?: IconSize
}
