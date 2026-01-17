'use client'

import { AutoScrollList } from '@components/ui'
import { type Partner, partners, type PartnerTier } from '@data/constants/partners'
import clsx from 'clsx'

import FirstTierPartner from './FirstTierPartner'
import PartnerBadge from './PartnerBadge'
import SecondTierPartner from './SecondTierPartner'

const CardRendererByTier: Record<PartnerTier, React.ComponentType<{ partner: Partner }>> = {
  1: FirstTierPartner,
  2: SecondTierPartner,
  3: PartnerBadge,
}

const PartnersList = ({ tier }: { tier: PartnerTier }) => {
  const PartnerComponent = CardRendererByTier[tier]
  const filteredPartners = partners[tier].filter((partner) => !partner.isHidden)

  if (filteredPartners.length === 0) return null

  return (
    <>
      <div className="space-y-3">
        <AutoScrollList className="overflow-hidden">
          {filteredPartners.map((partner) => (
            <li
              key={partner.id}
              className={clsx(
                'max-w-md flex-none',
                tier === 1 && (filteredPartners.length === 1 ? 'w-full' : 'w-[calc(100%-64px)]'),
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
