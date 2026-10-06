'use client'

import { useLocalizeField } from '@components/hooks'
import { Drawer } from '@components/ui'
import type { Partner } from '@domain/types'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'
import { usePartnerTracking } from '../tracking'

const badgeClassName = 'flex items-center gap-2 rounded-xl bg-gray-100 p-3'

const SecondTierPartner = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const { hasDetails, trackBadgeClick } = usePartnerTracking(partner)

  const logoNode = (
    <>
      <div className="flex size-24 flex-none items-center justify-center overflow-hidden rounded-xl">
        <PartnerLogo className="size-full object-contain" logoUrl={partner.logoUrl} name={name} />
      </div>
      <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
    </>
  )

  if (!hasDetails) {
    return (
      <a
        className={badgeClassName}
        href={partner.websiteUrl}
        onClick={trackBadgeClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {logoNode}
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={badgeClassName} onClick={trackBadgeClick} type="button">
        {logoNode}
      </button>
    </Drawer>
  )
}

export default SecondTierPartner
