'use client'

import { PageSection } from '@components/layout'
import { ButtonLink } from '@components/shared'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import { MainPartnerPlaceholder } from './MainPartnerCard'
import PartnersScrollBox from './PartnersScrollBox'

import { routes } from '@/routes'

const Partners = ({ partners }: { partners: Partner[] }) => {
  const t = useTranslations()

  return (
    <PageSection title={t('partners.main.title')}>
      {partners.length === 0 ? (
        <div className="flex justify-center">
          <MainPartnerPlaceholder />
        </div>
      ) : (
        <PartnersScrollBox partners={partners} />
      )}

      <ButtonLink className="mt-4" href={routes.partners}>
        {t('partners.main.seeAllButton')}
      </ButtonLink>
    </PageSection>
  )
}

export default Partners
