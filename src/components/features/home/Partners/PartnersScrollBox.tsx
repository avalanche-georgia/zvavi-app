import { AutoScrollList } from '@components/ui'
import type { Partner } from '@data/constants/partners'
import clsx from 'clsx'

import { MainPartnerCard } from './MainPartnerCard'

type PartnersScrollBoxProps = {
  className?: string
  partners: Partner[]
}

const PartnersScrollBox = ({ className, partners }: PartnersScrollBoxProps) => {
  const items = partners.map((partner) => (
    <li key={partner.id}>
      <MainPartnerCard partner={partner} />
    </li>
  ))

  if (partners.length === 1) {
    return <ul className={clsx('flex justify-center', className)}>{items}</ul>
  }

  return <AutoScrollList className={clsx('overflow-hidden', className)}>{items}</AutoScrollList>
}

export default PartnersScrollBox
