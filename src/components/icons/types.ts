import type { Size } from '@components/types'

export type IconName =
  | 'atSign'
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'cloudSnow'
  | 'copy'
  | 'copyCheck'
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

export type BrandIconName = 'facebook' | 'instagram'

type IconSize = Size

export type IconProps = {
  className?: string
  icon: IconName | BrandIconName
  size?: IconSize
}
