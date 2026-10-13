'use client'

import { PartnerBadge } from '@components/features/partners/PartnersList'
import { PartnersTracking } from '@components/features/partners/tracking'
import { usePartnersQuery } from '@data/hooks/partners'
import { useTranslations } from 'next-intl'

import SectionCard from './SectionCard'

// "Forecast made possible by" — partner logos (tiers 1–2) in a tile grid
const SponsorsCard = ({ className }: { className?: string }) => {
  const t = useTranslations()
  const { data: partners = [] } = usePartnersQuery()
  const visiblePartners = partners.filter((partner) => partner.tier !== 3)

  if (visiblePartners.length === 0) return null

  return (
    <SectionCard className={className} title={t('forecast.sections.partners.title')}>
      <PartnersTracking partners={visiblePartners} placement="forecast">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
          {visiblePartners.map((partner) => (
            <li key={partner.id}>
              <PartnerBadge
                className="bg-tile rounded-media aspect-square size-auto w-full"
                partner={partner}
              />
            </li>
          ))}
        </ul>
      </PartnersTracking>
    </SectionCard>
  )
}

export default SponsorsCard
