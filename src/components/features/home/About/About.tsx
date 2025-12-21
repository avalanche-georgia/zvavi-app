import { ButtonLink, PageSection } from '@components/shared'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const About = () => {
  const t = useTranslations()

  return (
    <PageSection title={t('about.title')}>
      <div className="flex flex-col gap-4">
        <p className="text-justify">{t('about.section.main.description')}</p>

        <ButtonLink href={routes.about}>{t('common.actions.learnMore')}</ButtonLink>
      </div>
    </PageSection>
  )
}

export default About
