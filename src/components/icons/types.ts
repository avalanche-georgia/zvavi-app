import type { Size } from '@components/types'

export type IconName =
  | 'atSign'
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'circleAlert'
  | 'circleCheck'
  | 'cloudSnow'
  | 'copy'
  | 'copyCheck'
  | 'download'
  | 'externalLink'
  | 'eye'
  | 'eyeOff'
  | 'grip'
  | 'handshake'
  | 'history'
  | 'home'
  | 'image'
  | 'info'
  | 'link'
  | 'logOut'
  | 'mail'
  | 'mapPin'
  | 'mapPinned'
  | 'menu'
  | 'mountainSnow'
  | 'pencil'
  | 'plus'
  | 'search'
  | 'snowflake'
  | 'thermometerSnowflake'
  | 'trash'
  | 'triangleAlert'
  | 'upload'
  | 'userPlus'
  | 'users'
  | 'xMark'

export type BrandIconName = 'facebook' | 'instagram'

type IconSize = Size

export type IconProps = {
  className?: string
  containerClassName?: string
  icon: IconName | BrandIconName
  size?: IconSize
}
