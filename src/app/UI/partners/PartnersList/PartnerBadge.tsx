import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'
import PartnerInfo from './PartnerInfo'

const Logo = ({ logo, name }: { logo: StaticImageData; name: string }) => (
  <div className="flex size-full items-center justify-center overflow-hidden rounded-xl">
    <Image alt={`${name} logo`} className="object-contain" height={80} src={logo} />
  </div>
)

const badgeClassName =
  'flex size-24 items-center justify-center rounded-2xl bg-gray-100 p-2 flex-none'

const PartnerBadge = ({ partner }: { partner: Partner }) => {
  const { infoKey, logo, name, url } = partner
  const hasInfo = Boolean(infoKey)

  if (!hasInfo) {
    return (
      <a className={badgeClassName} href={url} rel="noopener noreferrer" target="_blank">
        <Logo logo={logo} name={name} />
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={badgeClassName} type="button">
        <Logo logo={logo} name={name} />
      </button>
    </Drawer>
  )
}

export default PartnerBadge
