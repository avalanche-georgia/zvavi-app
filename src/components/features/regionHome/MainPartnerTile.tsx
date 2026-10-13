'use client'

import { PartnerInfo, PartnerLogo } from '@components/features/partners/PartnersList'
import { usePartnerTracking } from '@components/features/partners/tracking'
import { useLocalizeField } from '@components/hooks'
import { Drawer } from '@components/ui'
import type { Partner } from '@domain/types'

const tileClasses =
  'bg-surface hover:bg-canvas text-ink flex size-full flex-col items-center gap-2.5 p-4 text-center transition-colors focus-visible:outline-accent focus-visible:outline-2 focus-visible:-outline-offset-2'

// Logo + name. Opens the partner's details when there are any, else their website.
const MainPartnerTile = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const { hasDetails, trackBadgeClick } = usePartnerTracking(partner)

  const content = (
    <>
      <span className="block aspect-5/2 w-full max-w-55">
        <PartnerLogo logoUrl={partner.logoUrl} name={name} />
      </span>
      <b className="text-copy-lg font-semibold wrap-anywhere">{name}</b>
    </>
  )

  if (!hasDetails) {
    return (
      <a
        className={tileClasses}
        href={partner.websiteUrl}
        onClick={trackBadgeClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={tileClasses} onClick={trackBadgeClick} type="button">
        {content}
      </button>
    </Drawer>
  )
}

export default MainPartnerTile
