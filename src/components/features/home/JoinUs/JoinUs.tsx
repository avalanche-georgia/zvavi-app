import { PageSection } from '@components/layout'
import { ButtonLink } from '@components/shared'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const JoinUs = () => {
  const t = useTranslations()

  return (
    <PageSection title={t('joinUs.main.title')}>
      <div className="flex flex-col gap-4">
        <p className="text-justify">{t('joinUs.main.section.description')}</p>
        <p className="text-justify">{t('joinUs.main.section.description2')}</p>

        <ButtonLink href={routes.about.joinUs}>
          {t('joinUs.main.section.learnHowToHelp')}
        </ButtonLink>
      </div>
    </PageSection>
  )
}

export default JoinUs
