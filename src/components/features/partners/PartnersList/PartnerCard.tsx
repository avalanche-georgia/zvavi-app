'use client'

import type { Partner } from '@domain/types'
import { ClampedText } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import CardLogo from './CardLogo'
import PartnerLink from './PartnerLink'
import PerkTip from './PerkTip'
import usePartnerFields from './usePartnerFields'
import { usePartnerTracking } from '../tracking'

import { cn } from '@/lib/utils'

// Tier 2: logo, name and link in a row, description below, perk behind a gift icon
const PartnerCard = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const { benefit, description, name } = usePartnerFields(partner)
  const { trackWebsiteClick } = usePartnerTracking(partner)

  return (
    <article className="rounded-card border-rule bg-surface relative flex h-full flex-col gap-3.5 border p-4.5">
      {benefit && <PerkTip benefit={benefit} className="absolute top-3 right-3" />}
      <div className={cn('flex items-center gap-3.5', benefit && 'pr-9')}>
        <CardLogo className="rounded-media size-20" logoUrl={partner.logoUrl} />
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-heading font-semibold wrap-anywhere">{name}</h2>
          <PartnerLink name={name} onClick={trackWebsiteClick} url={partner.websiteUrl} />
        </div>
      </div>
      {description && (
        <ClampedText
          className="text-copy"
          lessLabel={t('partners.page.showLess')}
          lines={2}
          moreLabel={t('partners.page.readMore')}
        >
          {description}
        </ClampedText>
      )}
    </article>
  )
}

export default PartnerCard
