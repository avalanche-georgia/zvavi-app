import { richBold } from '@components/shared'
import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Who we are · What we do · the forecasts' limits · how to get involved
const AboutUsContent = () => {
  const t = useTranslations()

  return (
    <>
      <ContentCard title={t('about.sections.who')}>
        <p>{t.rich('about.content.who', { b: richBold })}</p>
      </ContentCard>
      <ContentCard title={t('about.sections.what')}>
        <p>{t.rich('about.content.what', { b: richBold })}</p>
      </ContentCard>
      <ContentCard title={t('about.sections.responsibility')} tone="warning">
        <p>{t.rich('about.content.responsibility', { b: richBold })}</p>
      </ContentCard>
      <ContentCard title={t('about.sections.next')}>
        <p>{t('about.content.next')}</p>
        <div className="flex flex-wrap gap-2">
          <Link className={getButtonClasses()} href={routes.about.joinUs}>
            {t('navigation.joinUs')}
          </Link>
          <Link className={getButtonClasses({ variant: 'secondary' })} href={routes.about.contact}>
            {t('navigation.contact')}
          </Link>
        </div>
      </ContentCard>
    </>
  )
}

export default AboutUsContent
