'use client'

import { AutoScrollList } from '@components/ui'
import type { Partner, PartnerTier } from '@domain/types'
import clsx from 'clsx'
import type { AutoScrollOptionsType } from 'embla-carousel-auto-scroll'

import FirstTierPartner from './FirstTierPartner'
import PartnerBadge from './PartnerBadge'
import SecondTierPartner from './SecondTierPartner'

const cardRendererByTier: Record<PartnerTier, React.ComponentType<{ partner: Partner }>> = {
  1: FirstTierPartner,
  2: SecondTierPartner,
  3: PartnerBadge,
}

type PartnersListProps = {
  partners: Partner[]
  scrollDirection?: AutoScrollOptionsType['direction']
  tier: PartnerTier
}

const PartnersList = ({ partners, scrollDirection, tier }: PartnersListProps) => {
  const PartnerComponent = cardRendererByTier[tier]

  if (partners.length === 0) return null

  return (
    <>
      <div className="space-y-3">
        <AutoScrollList className="overflow-hidden" direction={scrollDirection}>
          {partners.map((partner) => (
            <li
              key={partner.id}
              className={clsx(
                'max-w-md flex-none',
                tier === 1 && (partners.length === 1 ? 'w-full' : 'w-[calc(100%-64px)]'),
              )}
            >
              <PartnerComponent partner={partner} />
            </li>
          ))}
        </AutoScrollList>
      </div>

      <hr />
    </>
  )
}

export default PartnersList
