import { ButtonLink } from '@components/shared'
import { useTranslations } from 'next-intl'

import { PartnersList } from './PartnersList'

import { routes } from '@/routes'

const PageContent = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-8">
      <p>{t('partners.description')}</p>

      <PartnersList tier={1} />
      <PartnersList tier={2} />
      <PartnersList tier={3} />

      <section className="space-y-3">
        <h3 className="text-xl font-semibold">{t('partners.becomePartner.title')}</h3>
        <p className="text-justify">{t('partners.becomePartner.description')}</p>

        <ButtonLink href={routes.contact}>{t('common.actions.getInTouch')}</ButtonLink>
      </section>
    </div>
  )
}

export default PageContent
