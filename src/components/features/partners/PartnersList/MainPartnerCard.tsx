'use client'

import type { Partner } from '@domain/types'
import { ClampedText } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import CardLogo from './CardLogo'
import MainPartnerTag from './MainPartnerTag'
import PartnerLink from './PartnerLink'
import PerkCallout from './PerkCallout'
import usePartnerFields from './usePartnerFields'
import { usePartnerTracking } from '../tracking'

// Tier 1: large logo beside the tag, name, description, perk and link
const MainPartnerCard = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const { benefit, description, name } = usePartnerFields(partner)
  const { trackWebsiteClick } = usePartnerTracking(partner)

  return (
    <article className="rounded-card border-rule bg-surface flex h-full flex-col items-start gap-4.5 border p-5 md:flex-row md:items-center md:gap-7 md:p-7">
      <CardLogo className="rounded-card size-28 md:size-42" logoUrl={partner.logoUrl} />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <MainPartnerTag />
        <h2 className="text-title-sm md:text-title font-semibold wrap-anywhere">{name}</h2>
        {description && (
          <ClampedText
            className="text-copy-lg"
            lessLabel={t('partners.page.showLess')}
            lines={2}
            moreLabel={t('partners.page.readMore')}
          >
            {description}
          </ClampedText>
        )}
        {benefit && <PerkCallout benefit={benefit} />}
        <PartnerLink name={name} onClick={trackWebsiteClick} url={partner.websiteUrl} />
      </div>
    </article>
  )
}

export default MainPartnerCard
