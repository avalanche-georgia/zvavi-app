'use client'

import { useLocalizeField } from '@components/hooks'
import { DetailsSheet } from '@components/shared'
import type { Partner } from '@domain/types'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'
import { usePartnerTracking } from '../tracking'

import { cn } from '@/lib/utils'

type PartnerBadgeProps = {
  className?: string
  partner: Partner
}

const PartnerBadge = ({ className, partner }: PartnerBadgeProps) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)
  const { hasDetails, trackBadgeClick } = usePartnerTracking(partner)

  const badgeClassName = cn(
    'rounded-card bg-tile flex size-24 flex-none items-center justify-center p-2',
    className,
  )

  const logoNode = <PartnerLogo className="size-full" logoUrl={partner.logoUrl} name={name} />

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
    <DetailsSheet
      title={name}
      trigger={
        <button className={badgeClassName} onClick={trackBadgeClick} type="button">
          {logoNode}
        </button>
      }
    >
      <PartnerInfo partner={partner} />
    </DetailsSheet>
  )
}

export default PartnerBadge
