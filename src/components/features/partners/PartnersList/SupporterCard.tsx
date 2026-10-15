'use client'

import type { Partner } from '@domain/types'

import CardLogo from './CardLogo'
import ClampedText from './ClampedText'
import PartnerLink from './PartnerLink'
import PerkTip from './PerkTip'
import usePartnerFields from './usePartnerFields'
import { usePartnerTracking } from '../tracking'

import { cn } from '@/lib/utils'

// Tier 3 from `sm` up: small logo, name, link on its own line, one line of description
const SupporterCard = ({ partner }: { partner: Partner }) => {
  const { benefit, description, name } = usePartnerFields(partner)
  const { trackWebsiteClick } = usePartnerTracking(partner)

  return (
    <article className="rounded-card border-rule bg-surface relative flex h-full items-start gap-3 border p-3.5">
      {benefit && <PerkTip benefit={benefit} className="absolute top-2.5 right-2.5" size="sm" />}
      <CardLogo className="rounded-control size-15" logoUrl={partner.logoUrl} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className={cn('flex flex-col items-start gap-0.5', benefit && 'pr-7.5')}>
          <h2 className="text-copy font-semibold wrap-anywhere">{name}</h2>
          <PartnerLink
            className="text-caption"
            name={name}
            onClick={trackWebsiteClick}
            url={partner.websiteUrl}
          />
        </div>
        {description && (
          <ClampedText className="text-copy-sm" lines={1}>
            {description}
          </ClampedText>
        )}
      </div>
    </article>
  )
}

export default SupporterCard
