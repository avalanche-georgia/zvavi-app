'use client'

import { useLocalizeField } from '@components/hooks'
import { Drawer } from '@components/ui'
import type { Partner } from '@domain/types'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const cardClassName = 'bg-primary/10 flex w-full flex-col items-center gap-4 rounded-2xl p-4'

const FirstTierPartner = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const hasDrawerContent = Boolean(
    partner.benefitEn || partner.benefitKa || partner.descriptionEn || partner.descriptionKa,
  )

  const logoNode = (
    <>
      <div className="inline-flex h-25 max-w-50 items-center justify-center">
        <PartnerLogo className="max-w-50" logoUrl={partner.logoUrl} name={name} />
      </div>
      <h3 className="text-center text-xl font-semibold text-gray-900">{name}</h3>
    </>
  )

  if (!hasDrawerContent) {
    return (
      <a
        className={cardClassName}
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
      <button className={cardClassName} type="button">
        {logoNode}
      </button>
    </Drawer>
  )
}

export default FirstTierPartner
