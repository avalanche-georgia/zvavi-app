'use client'

import { useLocalizeField } from '@components/hooks'
import { Button, Drawer } from '@components/ui'
import { usePartnersQuery } from '@data/hooks/partners'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

type DrawerContentProps = {
  partners: Partner[]
}

const DrawerContent = ({ partners }: DrawerContentProps) => {
  const localize = useLocalizeField()

  return (
    <ul className="flex flex-col gap-4">
      {partners.map((partner) => {
        const { benefitEn, benefitKa, id, nameEn, nameKa } = partner
        const name = localize(nameEn, nameKa)
        const benefit = localize(benefitEn ?? '', benefitKa)

        return (
          <li key={id} className="rounded-md border p-4">
            <p className="font-semibold">{name}</p>
            {benefit && <p className="mt-1 text-sm text-gray-600">{benefit}</p>}
          </li>
        )
      })}
    </ul>
  )
}

const PartnerBenefitsDrawer = () => {
  const t = useTranslations()
  const { data: partners } = usePartnersQuery()

  const partnersWithBenefits =
    partners?.filter((partner) => partner.benefitEn || partner.benefitKa) ?? []

  if (partnersWithBenefits.length === 0) return null

  return (
    <Drawer
      content={<DrawerContent partners={partnersWithBenefits} />}
      title={t('partners.benefits.drawerTitle')}
    >
      <div>
        <Button variant="secondary">{t('partners.benefits.triggerLabel')}</Button>
      </div>
    </Drawer>
  )
}

export default PartnerBenefitsDrawer
