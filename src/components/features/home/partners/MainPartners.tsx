import { PartnersTracking } from '@components/features/partners/tracking'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import BecomeMainPartner from './BecomeMainPartner'
import MainPartnerFeature from './MainPartnerFeature'
import HomeSection from '../HomeSection'
import SectionHeader from '../SectionHeader'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

const headingId = 'home-partners'

// Tier-1 partners as wide cards, or an invitation while there are none
const MainPartners = ({ partners }: { partners: Partner[] }) => {
  const t = useTranslations()
  const hasMany = partners.length > 1

  return (
    <HomeSection labelledBy={headingId}>
      <SectionHeader
        href={routes.partners}
        id={headingId}
        linkLabel={t('home.partners.seeAll')}
        title={partners.length === 1 ? t('home.partners.titleOne') : t('home.partners.titleMany')}
      />
      {partners.length === 0 ? (
        <BecomeMainPartner />
      ) : (
        <PartnersTracking partners={partners} placement="home">
          <ul className={cn('grid gap-4', hasMany && 'md:grid-cols-2')}>
            {partners.map((partner) => (
              <li key={partner.id}>
                <MainPartnerFeature isStacked={hasMany} partner={partner} />
              </li>
            ))}
          </ul>
        </PartnersTracking>
      )}
    </HomeSection>
  )
}

export default MainPartners
