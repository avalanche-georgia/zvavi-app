import type { Size } from '@/UI/types'

export type IconName =
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'cloudSnow'
  | 'externalLink'
  | 'eye'
  | 'eyeOff'
  | 'handshake'
  | 'info'
  | 'mail'
  | 'mapPin'
  | 'menu'
  | 'mountainSnow'
  | 'pencil'
  | 'plus'
  | 'snowflake'
  | 'thermometerSnowflake'
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
