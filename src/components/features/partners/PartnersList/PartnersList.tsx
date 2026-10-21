import type { Partner } from '@domain/types'

import MainPartnerCard from './MainPartnerCard'
import MainPartnerInvite from './MainPartnerInvite'
import PartnerCard from './PartnerCard'
import SupportersGrid from './SupportersGrid'
import TierSection from './TierSection'

// All three tiers, every partner shown, in the order given. No main partner →
// an invitation; an empty tier 2 or 3 is left out.
const PartnersList = ({ partners }: { partners: Partner[] }) => {
  const mainPartners = partners.filter((partner) => partner.tier === 1)
  const tierTwoPartners = partners.filter((partner) => partner.tier === 2)
  const supporters = partners.filter((partner) => partner.tier === 3)

  return (
    <>
      <TierSection>
        {mainPartners.length > 0 ? (
          // Up to two per row; one left alone in its row takes the full width
          <ul className="grid gap-4 lg:grid-cols-2">
            {mainPartners.map((partner) => (
              <li key={partner.id} className="lg:last:odd:col-span-2">
                <MainPartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        ) : (
          <MainPartnerInvite />
        )}
      </TierSection>
      {tierTwoPartners.length > 0 && (
        <TierSection>
          <ul className="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            {tierTwoPartners.map((partner) => (
              <li key={partner.id}>
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </TierSection>
      )}
      {supporters.length > 0 && (
        <TierSection>
          <SupportersGrid partners={supporters} />
        </TierSection>
      )}
    </>
  )
}

export default PartnersList
