import { useTranslations } from 'next-intl'

import { partners } from '@/data/constants/partners'

import { ButtonLink, PageSection } from '@/UI/components'

import { routes } from '@/routes'
import { MainPartnerPlaceholder, PartnersScrollBox } from '@/UI/partners/PartnersList'

const partnerList = partners[1].filter((partner) => !partner.isHidden)

const Partners = () => {
  const t = useTranslations()

  return (
    <PageSection title={t('partners.main.title')}>
      {partnerList.length === 0 ? (
        <div className="flex justify-center">
          <MainPartnerPlaceholder />
        </div>
      ) : (
        <PartnersScrollBox partners={partnerList} />
      )}

      <ButtonLink className="mt-4" href={routes.partners}>
        {t('partners.main.seeAllButton')}
      </ButtonLink>
    </PageSection>
  )
}

export default Partners
