'use client'

import { useTranslations } from 'next-intl'

import { feedbackFormURL } from '@/UI/constants'

import { ButtonLink } from '@/UI/components'

import ContactLinkList from '@/UI/contact/ContactLinkList'

const LinksSection = () => {
  const t = useTranslations()

  return (
    <section>
      <h4 className="mb-2 text-lg font-semibold">{t('contact.title')}</h4>
      <p className="mb-3 whitespace-pre-line text-justify">{t('contact.description')}</p>
      <ContactLinkList />

      <ButtonLink className="mt-4" href={feedbackFormURL} isExternal>
        {t('common.labels.leaveFeedback')}
      </ButtonLink>
    </section>
  )
}

export default LinksSection
