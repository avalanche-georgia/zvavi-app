'use client'

import { PageSection } from '@components/layout'
import { ButtonLink } from '@components/shared'
import { usePartnersQuery } from '@data/hooks/partners'
import { useTranslations } from 'next-intl'

import { MainPartnerPlaceholder } from './MainPartnerCard'
import PartnersScrollBox from './PartnersScrollBox'

import { routes } from '@/routes'

const Partners = () => {
  const t = useTranslations()
  const { data: partners = [] } = usePartnersQuery()
  const tier1Partners = partners.filter((partner) => partner.tier === 1)

  return (
    <PageSection title={t('partners.main.title')}>
      {tier1Partners.length === 0 ? (
        <div className="flex justify-center">
          <MainPartnerPlaceholder />
        </div>
      ) : (
        <PartnersScrollBox partners={tier1Partners} />
      )}

      <ButtonLink className="mt-4" href={routes.partners}>
        {t('partners.main.seeAllButton')}
      </ButtonLink>
    </PageSection>
  )
}

export default Partners
