'use client'

import { useTranslations } from 'next-intl'

import ContactLinkList from '@/UI/contact/ContactLinkList'

const LinksSection = () => {
  const t = useTranslations()

  return (
    <section>
      <h4 className="mb-2 text-lg font-semibold">{t('contact.title')}</h4>
      <p className="mb-3 whitespace-pre-line text-justify">{t('contact.description')}</p>
      <ContactLinkList />
    </section>
  )
}

export default LinksSection
