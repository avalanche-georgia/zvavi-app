'use client'

import { useLocalizeField } from '@components/hooks'
import { DetailsSheet } from '@components/shared'
import { usePartnersQuery } from '@data/hooks/partners'
import type { Partner } from '@domain/types'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type PartnerBenefitsListProps = {
  partners: Partner[]
}

const PartnerBenefitsList = ({ partners }: PartnerBenefitsListProps) => {
  const localize = useLocalizeField()

  return (
    <ul className="flex flex-col gap-4">
      {partners.map((partner) => {
        const { benefitEn, benefitKa, id, nameEn, nameKa } = partner
        const name = localize(nameEn, nameKa)
        const benefit = localize(benefitEn ?? '', benefitKa)

        return (
          <li key={id} className="rounded-media border-rule border p-4">
            <p className="text-ink font-semibold">{name}</p>
            {benefit && <p className="text-body text-copy-sm mt-1">{benefit}</p>}
          </li>
        )
      })}
    </ul>
  )
}

const PartnerBenefitsSheet = () => {
  const t = useTranslations()
  const { data: partners } = usePartnersQuery()

  const partnersWithBenefits =
    partners?.filter((partner) => partner.benefitEn || partner.benefitKa) ?? []

  if (partnersWithBenefits.length === 0) return null

  return (
    <DetailsSheet
      title={t('partners.benefits.drawerTitle')}
      trigger={<Button variant="secondary">{t('partners.benefits.triggerLabel')}</Button>}
    >
      <PartnerBenefitsList partners={partnersWithBenefits} />
    </DetailsSheet>
  )
}

export default PartnerBenefitsSheet
