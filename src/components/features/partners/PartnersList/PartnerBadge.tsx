'use client'

import { useLocalizeField } from '@components/hooks'
import { Drawer } from '@components/ui'
import type { Partner } from '@domain/types'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const PartnerBadge = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const hasDrawerContent = Boolean(
    partner.benefitEn || partner.benefitKa || partner.descriptionEn || partner.descriptionKa,
  )

  const badgeClassName =
    'flex size-24 flex-none items-center justify-center rounded-2xl bg-gray-100 p-2'

  const logoNode = <PartnerLogo className="size-full" logoUrl={partner.logoUrl} name={name} />

  if (!hasDrawerContent) {
    return (
      <a
        className={badgeClassName}
        href={partner.websiteUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
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
