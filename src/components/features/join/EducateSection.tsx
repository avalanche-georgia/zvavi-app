import { links } from '@components/constants'
import { NewTabLink } from '@components/shared'
import { ContentCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ListSection from './ListSection'

// The course sign-up link inside the translated sentence
const courseLink = (chunks: React.ReactNode) => (
  <NewTabLink
    className="focus-ring text-accent hover:text-accent-hover rounded-sm underline underline-offset-2"
    href={links.courseForm}
  >
    {chunks}
  </NewTabLink>
)

const EducateSection = () => {
  const t = useTranslations()

  return (
    <ContentCard title={t('joinUs.page.educate.title')}>
      <ListSection
        intro={t('joinUs.page.educate.descriptionPre')}
        items={[
          t('joinUs.page.educate.options.share'),
          t.rich('joinUs.page.educate.options.courses', { a: courseLink }),
          t('joinUs.page.educate.options.events'),
        ]}
      />
      <p>{t('joinUs.page.educate.descriptionPost')}</p>
    </ContentCard>
  )
}

export default EducateSection
