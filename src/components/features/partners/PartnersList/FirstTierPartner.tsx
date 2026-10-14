'use client'

import { useLocalizeField } from '@components/hooks'
import { DetailsSheet } from '@components/shared'
import type { Partner } from '@domain/types'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'
import { usePartnerTracking } from '../tracking'

const cardClassName = 'bg-primary/10 flex w-full flex-col items-center gap-4 rounded-2xl p-4'

const FirstTierPartner = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const { hasDetails, trackBadgeClick } = usePartnerTracking(partner)

  const logoNode = (
    <>
      <div className="inline-flex h-25 max-w-50 items-center justify-center">
        <PartnerLogo className="max-w-50" logoUrl={partner.logoUrl} name={name} />
      </div>
      <h3 className="text-center text-xl font-semibold text-gray-900">{name}</h3>
    </>
  )

  if (!hasDetails) {
    return (
      <a
        className={cardClassName}
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
    <DetailsSheet
      title={name}
      trigger={
        <button className={cardClassName} onClick={trackBadgeClick} type="button">
          {logoNode}
        </button>
      }
    >
      <PartnerInfo partner={partner} />
    </DetailsSheet>
  )
}

export default FirstTierPartner
