'use client'

import clsx from 'clsx'
import { FirstTierPartner, SecondTierPartner } from 'src/app/UI/partners/PartnersList'

import { type Partner, partners, type PartnerTier } from '@/data/constants/partners'

import PartnerBadge from './PartnerBadge'

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
        <ul className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
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
        </ul>
      </div>

      <hr />
    </>
  )
}

export default PartnersList
