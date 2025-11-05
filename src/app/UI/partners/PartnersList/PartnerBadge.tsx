import Image from 'next/image'

import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'
import PartnerInfo from './PartnerInfo'

const badgeClassName =
  'flex size-24 items-center justify-center rounded-2xl bg-gray-100 p-2 flex-none'

const PartnerBadge = ({ partner }: { partner: Partner }) => {
  const { infoKey, logo, name, url } = partner
  const hasInfo = Boolean(infoKey)

  const Logo = <Image alt={name} height={80} src={logo} />

  if (!hasInfo) {
    return (
      <a className={badgeClassName} href={url} rel="noopener noreferrer" target="_blank">
        {Logo}
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={badgeClassName} type="button">
        {Logo}
      </button>
    </Drawer>
  )
}

export default PartnerBadge
