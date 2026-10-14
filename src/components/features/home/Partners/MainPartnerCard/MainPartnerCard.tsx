'use client'

import { PartnerInfo, PartnerLogo } from '@components/features/partners/PartnersList'
import { usePartnerTracking } from '@components/features/partners/tracking'
import { useLocalizeField } from '@components/hooks'
import { DetailsSheet } from '@components/shared'
import type { Partner } from '@domain/types'

const cardClassName =
  'bg-primary/10 flex h-36 w-64 flex-col items-center gap-3 rounded-2xl px-8 py-3'

const MainPartnerCard = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const { hasDetails, trackBadgeClick } = usePartnerTracking(partner)

  const logoNode = (
    <div className="inline-flex h-30 max-w-50 items-center justify-center">
      <PartnerLogo className="size-full" logoUrl={partner.logoUrl} name={name} />
    </div>
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

export default MainPartnerCard
