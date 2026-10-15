import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import ListSection from './ListSection'

import { routes } from '@/routes'

const VolunteerSection = () => {
  const t = useTranslations()
  const options: string[] = t.raw('joinUs.page.volunteer.options') ?? []

  return (
    <ContentCard title={t('joinUs.page.volunteer.title')}>
      <ListSection intro={t('joinUs.page.volunteer.descriptionPre')} items={options} />
      <p>{t('joinUs.page.volunteer.descriptionPost')}</p>
      <Link
        className={getButtonClasses({ className: 'self-start', variant: 'text' })}
        href={routes.about.contact}
      >
        {t('common.actions.seeContactPage')}
      </Link>
    </ContentCard>
  )
}

export default VolunteerSection
