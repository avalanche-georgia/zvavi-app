'use client'

import { PageSection } from '@components/layout'
import { usePartnersQuery } from '@data/hooks/partners'
import { useTranslations } from 'next-intl'

import PartnersScrollBox from './PartnersScrollBox'

const ForecastPartnersSection = () => {
  const t = useTranslations()
  const { data: partners = [] } = usePartnersQuery()
  const visiblePartners = partners.filter((partner) => partner.tier !== 3)

  if (visiblePartners.length === 0) return null

  return (
    <PageSection title={t('forecast.sections.partners.title')}>
      <PartnersScrollBox partners={visiblePartners} />
    </PageSection>
  )
}

export default ForecastPartnersSection
