'use client'

import { PartnersList } from '@components/features/admin/Partners/PartnersList'
import { Spinner } from '@components/ui'
import { useAllPartnersQuery } from '@data/hooks/partners'
import { useTranslations } from 'next-intl'

const PartnersPage = () => {
  const t = useTranslations()
  const { data: partners, isPending } = useAllPartnersQuery()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!partners) return null

  return <PartnersList partners={partners} />
}

export default PartnersPage
