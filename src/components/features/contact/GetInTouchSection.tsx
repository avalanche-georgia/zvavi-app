import { feedbackFormURL } from '@components/constants'
import { SocialLinks } from '@components/shared'
import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Social channels and email, and the feedback form
const GetInTouchSection = () => {
  const t = useTranslations()

  return (
    <ContentCard title={t('contact.title')}>
      <p>{t('contact.social')}</p>
      <SocialLinks />
      <a
        className={getButtonClasses({ className: 'self-start', variant: 'secondary' })}
        href={feedbackFormURL}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('common.labels.leaveFeedback')}
        <ExternalLink aria-hidden className="text-muted size-4" />
      </a>
    </ContentCard>
  )
}

export default GetInTouchSection
