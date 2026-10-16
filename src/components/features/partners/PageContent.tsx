import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import BecomePartnerBlock from './BecomePartnerBlock'
import { PartnersList, TierSection } from './PartnersList'
import { PartnersTracking } from './tracking'

// Title and lede, the three tiers, then how to become a partner. Partners come
// straight from the server, already shuffled — no client refetch, which would
// reorder them (and share that order with the forecast's partner list).
const PageContent = ({ partners }: { partners: Partner[] }) => {
  const t = useTranslations()

  return (
    <div className="bg-canvas text-ink">
      <div className="mx-auto max-w-310 px-4 md:px-5 xl:px-8">
        <header className="pt-5.5 pb-5 sm:pt-8 sm:pb-7">
          <h1 className="text-title-lg sm:text-display font-bold">{t('navigation.partners')}</h1>
          <p className="text-body text-copy-lg mt-2 max-w-[62ch] text-pretty">
            {t('partners.page.lede')}
          </p>
        </header>
        <PartnersTracking partners={partners} placement="partners_page">
          <PartnersList partners={partners} />
        </PartnersTracking>
        <TierSection>
          <BecomePartnerBlock />
        </TierSection>
      </div>
    </div>
  )
}

export default PageContent
