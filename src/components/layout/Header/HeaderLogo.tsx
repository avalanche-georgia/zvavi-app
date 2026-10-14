'use client'

import Logo from '@assets/images/logo.png'
import { useRegionContext } from '@domain/context/RegionContext'
import Image from 'next/image'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Logo + "Avalanche.ge": the active region's home, else the region chooser — never
// "/" (a redirect). Also heads the footer. isPriority: preload the image (the
// header's copy, seen first).
const HeaderLogo = ({ isPriority = false }: { isPriority?: boolean }) => {
  const { region } = useRegionContext()

  return (
    <Link
      className="focus-ring text-primary text-heading inline-flex shrink-0 items-center gap-2.5 rounded-lg font-bold"
      href={region ? routes.regionHome(region.id) : routes.regions}
    >
      <Image alt="" height={30} priority={isPriority} src={Logo} width={30} />
      Avalanche.ge
    </Link>
  )
}

export default HeaderLogo
