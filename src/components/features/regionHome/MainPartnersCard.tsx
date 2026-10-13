'use client'

import SectionCard from '@components/features/forecast/sections/SectionCard'
import { PartnersTracking } from '@components/features/partners/tracking'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import BecomePartnerBox from './BecomePartnerBox'
import MainPartnerTile from './MainPartnerTile'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

// Tier-1 partners as large logo tiles, or an invitation while there are none
const MainPartnersCard = ({ partners }: { partners: Partner[] }) => {
  const t = useTranslations()
  const hasMany = partners.length > 1

  return (
    <SectionCard
      action={
        <Link
          className="focus-ring text-accent hover:text-accent-hover text-copy-sm rounded-sm font-semibold"
          href={routes.partners}
        >
          {t('partners.main.seeAllButton')}
        </Link>
      }
      className="overflow-hidden"
      title={hasMany ? t('partners.main.title') : t('regionHome.partners.titleOne')}
    >
      {partners.length === 0 ? (
        <BecomePartnerBox />
      ) : (
        <PartnersTracking partners={partners} placement="home">
          {/* The 1px gaps over a rule-coloured background draw the dividers */}
          <ul
            className={cn(
              'bg-rule border-rule -mx-4 -mb-4 grid gap-px border-t lg:-mx-5 lg:-mb-5',
              hasMany && 'grid-cols-2',
            )}
          >
            {partners.map((partner) => (
              <li key={partner.id} className="last:odd:col-span-full">
                <MainPartnerTile partner={partner} />
              </li>
            ))}
          </ul>
        </PartnersTracking>
      )}
    </SectionCard>
  )
}

export default MainPartnersCard
