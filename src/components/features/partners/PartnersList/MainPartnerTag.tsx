import { useTranslations } from 'next-intl'

const MainPartnerTag = () => {
  const t = useTranslations()

  return (
    <span className="bg-primary-soft text-primary-ink rounded-badge text-caption inline-flex h-5.5 items-center self-start px-2 font-semibold">
      {t('partners.page.mainPartnerTag')}
    </span>
  )
}

export default MainPartnerTag
