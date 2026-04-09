'use client'

import { ButtonLink } from '@components/shared'
import { usePartnersQuery } from '@data/hooks/partners'
import type { Partner, PartnerTier } from '@domain/types'
import { useTranslations } from 'next-intl'

import { PartnersList } from './PartnersList'

import { routes } from '@/routes'

type PageContentProps = {
  initialPartners?: Partner[]
}

const PageContent = ({ initialPartners }: PageContentProps) => {
  const t = useTranslations()
  const { data: partners = [] } = usePartnersQuery(initialPartners)

  const byTier = (tier: PartnerTier) => partners.filter((partner) => partner.tier === tier)

  return (
    <div className="flex flex-col gap-8">
      <p>{t('partners.description')}</p>

      <PartnersList partners={byTier(1)} tier={1} />
      <PartnersList partners={byTier(2)} tier={2} />
      <PartnersList partners={byTier(3)} scrollDirection="backward" tier={3} />

      <section className="space-y-3">
        <h3 className="text-xl font-semibold">{t('partners.becomePartner.title')}</h3>
        <p className="text-justify">{t('partners.becomePartner.description')}</p>

        <ButtonLink href={routes.about.contact}>{t('common.actions.getInTouch')}</ButtonLink>
      </section>
    </div>
  )
}

export default PageContent
