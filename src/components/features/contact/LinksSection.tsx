'use client'

import { feedbackFormURL } from '@components/constants'
import ContactLinkList from '@components/features/contact/ContactLinkList'
import { ButtonLink } from '@components/shared'
import { useTranslations } from 'next-intl'

const LinksSection = () => {
  const t = useTranslations()

  return (
    <section>
      <h4 className="mb-2 text-lg font-semibold">{t('contact.title')}</h4>
      <p className="mb-3 whitespace-pre-line text-justify">{t('contact.description')}</p>
      <ContactLinkList />

      <ButtonLink
        className="mt-4"
        href={feedbackFormURL}
        isExternal
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('common.labels.leaveFeedback')}
      </ButtonLink>
    </section>
  )
}

export default LinksSection
