import { useTranslations } from 'next-intl'

import { ButtonLink } from '@/UI/components'

import { routes } from '@/routes'

const DrawerContent = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-6">
      <p className="text-justify">{t('partners.becomePartner.description')}</p>
      <ButtonLink className="ml-auto" href={routes.contact}>
        {t('common.actions.getInTouch')}
      </ButtonLink>
    </div>
  )
}

export default DrawerContent
