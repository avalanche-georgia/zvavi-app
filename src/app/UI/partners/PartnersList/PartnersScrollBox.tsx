import clsx from 'clsx'

import type { Partner } from '@/data/constants/partners'

import PartnerBadge from './PartnerBadge'

type PartnersScrollBoxProps = {
  className?: string
  partners: Partner[]
}

const PartnersScrollBox = ({ className, partners }: PartnersScrollBoxProps) => (
  <ul className={clsx('flex gap-2 overflow-x-auto scrollbar-hide', className)}>
    {partners.map((partner) => (
      <li key={partner.id}>
        <PartnerBadge partner={partner} />
      </li>
    ))}
  </ul>
)

export default PartnersScrollBox
