import classnames from 'classnames'

import { type Partner, partners, type PartnerTier } from '@/data/constants/partners'

import FreshTracksPartner from './FreshTracksPartner'
import PartnerBadge from './PartnerBadge'
import SummitPartner from './SummitPartner'

const CardRendererByLevel: Record<PartnerTier, React.ComponentType<{ partner: Partner }>> = {
  1: SummitPartner,
  2: FreshTracksPartner,
  3: PartnerBadge,
}

const PartnersList = ({ tier }: { tier: PartnerTier }) => {
  const PartnerComponent = CardRendererByLevel[tier]
  const filteredPartners = partners[tier].filter((partner) => !partner.isHidden)

  if (filteredPartners.length === 0) return null

  return (
    <>
      <div className="space-y-3">
        <ul className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {filteredPartners.map((partner) => (
            <li
              key={partner.id}
              className={classnames(
                'flex-none',
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
