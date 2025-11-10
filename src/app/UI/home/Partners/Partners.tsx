import { useTranslations } from 'next-intl'

import { partners } from '@/data/constants/partners'
import { routes } from '@/UI/header/NavMenu/constants'

import { ButtonLink, PageSection } from '@/UI/components'

import { PartnerBadge } from '@/UI/partners/PartnersList'

const order = ['summit', 'snowBase', 'freshTracks']

const Partners = () => {
  const t = useTranslations()
  const partnerList = Object.entries(partners)
    .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
    .flatMap(([, list]) => list)
    .filter((partner) => !partner.isHidden)

  return (
    <PageSection title={t('partners.main.title')}>
      <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {partnerList.map((partner) => (
          <PartnerBadge key={partner.id} partner={partner} />
        ))}
      </div>

      <ButtonLink href={routes.partners}>{t('partners.main.seeAllButton')}</ButtonLink>
    </PageSection>
  )
}

export default Partners
