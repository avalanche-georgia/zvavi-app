import clsx from 'clsx'

import type { Partner } from '@/data/constants/partners'

import { MainPartnerCard } from './MainPartnerCard'

type PartnersScrollBoxProps = {
  className?: string
  partners: Partner[]
}

const PartnersScrollBox = ({ className, partners }: PartnersScrollBoxProps) => (
  <ul
    className={clsx(
      'flex gap-2 overflow-x-auto scrollbar-hide',
      { 'justify-center': partners.length === 1 },
      className,
    )}
  >
    {partners.map((partner) => (
      <li key={partner.id}>
        <MainPartnerCard partner={partner} />
      </li>
    ))}
  </ul>
)

export default PartnersScrollBox
