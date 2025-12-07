import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'
import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const badgeClassName =
  'flex size-24 flex-none items-center justify-center rounded-2xl bg-gray-100 p-2'

const PartnerBadge = ({ partner }: { partner: Partner }) => {
  const { infoKey, isRounded, logo, name, url } = partner
  const hasInfo = Boolean(infoKey)

  if (!hasInfo) {
    return (
      <a className={badgeClassName} href={url} rel="noopener noreferrer" target="_blank">
        <PartnerLogo
          className="size-full"
          imageSize={{ height: 80, width: 80 }}
          isRounded={isRounded}
          logo={logo}
          name={name}
        />
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={badgeClassName} type="button">
        <PartnerLogo
          className="size-full"
          imageSize={{ height: 80, width: 80 }}
          isRounded={isRounded}
          logo={logo}
          name={name}
        />
      </button>
    </Drawer>
  )
}

export default PartnerBadge
