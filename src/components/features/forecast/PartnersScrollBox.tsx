import { PartnerBadge } from '@components/features/partners/PartnersList'
import { AutoScrollList } from '@components/ui'
import type { Partner } from '@data/constants/partners'
import clsx from 'clsx'

type PartnersScrollBoxProps = {
  className?: string
  partners: Partner[]
}

const PartnersScrollBox = ({ className, partners }: PartnersScrollBoxProps) => (
  <AutoScrollList className={clsx('overflow-hidden', className)}>
    {partners.map((partner) => (
      <li key={partner.id}>
        <PartnerBadge partner={partner} />
      </li>
    ))}
  </AutoScrollList>
)

export default PartnersScrollBox
