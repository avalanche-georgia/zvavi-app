import { AutoScrollList } from '@components/ui'
import type { Partner } from '@data/constants/partners'
import clsx from 'clsx'

import { MainPartnerCard } from './MainPartnerCard'

type PartnersScrollBoxProps = {
  className?: string
  partners: Partner[]
}

const PartnersScrollBox = ({ className, partners }: PartnersScrollBoxProps) => (
  <AutoScrollList
    className={clsx('overflow-hidden', { 'justify-center': partners.length === 1 }, className)}
  >
    {partners.map((partner) => (
      <li key={partner.id}>
        <MainPartnerCard partner={partner} />
      </li>
    ))}
  </AutoScrollList>
)

export default PartnersScrollBox
