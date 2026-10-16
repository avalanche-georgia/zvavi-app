import { feedbackFormURL } from '@components/constants'
import { NewTabLink, SocialLinks } from '@components/shared'
import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Social channels and email, and the feedback form
const GetInTouchSection = () => {
  const t = useTranslations()

  return (
    <ContentCard title={t('contact.title')}>
      <p>{t('contact.social')}</p>
      <SocialLinks />
      <NewTabLink
        className={getButtonClasses({ className: 'self-start', variant: 'secondary' })}
        hasIcon
        href={feedbackFormURL}
      >
        {t('common.labels.leaveFeedback')}
      </NewTabLink>
    </ContentCard>
  )
}

export default GetInTouchSection
