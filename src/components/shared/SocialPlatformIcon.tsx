import FacebookIcon from '@assets/icons/brand/facebook.svg'
import InstagramIcon from '@assets/icons/brand/instagram.svg'
import { Github, Globe, Linkedin, Youtube } from 'lucide-react'

import type { SocialPlatform } from '@/lib/socialLinks'
import { cn } from '@/lib/utils'

// Brand marks in one colour (currentColor), so a row of links reads as a set;
// any other site gets a globe
type SocialPlatformIconProps = {
  className?: string
  platform: SocialPlatform
}

const SocialPlatformIcon = ({ className, platform }: SocialPlatformIconProps) => {
  const classes = cn('size-4 shrink-0', className)
  // Filled marks fill their whole box; one step smaller reads the same size as
  // the outlined lucide icons, and the box keeps every icon centred alike
  const brandClasses = cn(classes, 'scale-85 fill-current')

  switch (platform) {
    case 'facebook':
      return <FacebookIcon aria-hidden className={brandClasses} />
    case 'instagram':
      return <InstagramIcon aria-hidden className={brandClasses} />
    case 'github':
      return <Github aria-hidden className={classes} />
    case 'linkedin':
      return <Linkedin aria-hidden className={classes} />
    case 'youtube':
      return <Youtube aria-hidden className={classes} />
    default:
      return <Globe aria-hidden className={classes} />
  }
}

export default SocialPlatformIcon
