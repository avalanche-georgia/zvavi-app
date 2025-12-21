import { Drawer } from '@components/ui'
import { type Partner, partners } from '@data/constants/partners'
import clsx from 'clsx'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const PartnerBadge = ({ partner }: { partner: Partner }) => {
  const { infoKey, isRounded, logo, name, url } = partner
  const hasInfo = Boolean(infoKey)

  const isTopTier = partners[1].some((topPartner) => topPartner.id === partner.id)

  const badgeClassName = clsx(
    'flex size-24 flex-none items-center justify-center rounded-2xl p-2',
    isTopTier ? 'bg-primary/10' : 'bg-gray-100',
  )

  const logoNode = (
    <PartnerLogo
      className="size-full"
      imageSize={{ height: 80, width: 80 }}
      isRounded={isRounded}
      logo={logo}
      name={name}
    />
  )

  if (!hasInfo) {
    return (
      <a className={badgeClassName} href={url} rel="noopener noreferrer" target="_blank">
        {logoNode}
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={badgeClassName} type="button">
        {logoNode}
      </button>
    </Drawer>
  )
}

export default PartnerBadge
