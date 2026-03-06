import { links } from '@components/constants'
import { useTranslations } from 'next-intl'

import LegalSection from './LegalSection'

const TermsOfServiceContent = () => {
  const t = useTranslations()

  return (
    <div className="space-y-6 text-sm text-gray-700">
      <p className="text-xs text-gray-500">{t('legal.terms.lastUpdated')}</p>
      <p>{t('legal.terms.intro')}</p>

      <LegalSection
        description={t('legal.terms.membership.description')}
        title={t('legal.terms.membership.title')}
      />

      <LegalSection
        description={t('legal.terms.volunteerNature.description')}
        title={t('legal.terms.volunteerNature.title')}
      />

      <LegalSection
        description={t('legal.terms.acceptableUse.description')}
        items={t.raw('legal.terms.acceptableUse.items') as string[]}
        title={t('legal.terms.acceptableUse.title')}
      />

      <LegalSection
        description={t('legal.terms.disclaimer.description')}
        title={t('legal.terms.disclaimer.title')}
      />

      <LegalSection
        description={t('legal.terms.fees.description')}
        title={t('legal.terms.fees.title')}
      />

      <LegalSection
        description={t('legal.terms.governingLaw.description')}
        title={t('legal.terms.governingLaw.title')}
      />

      <LegalSection
        description={t('legal.terms.changes.description')}
        title={t('legal.terms.changes.title')}
      />

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">{t('legal.terms.contact.title')}</h3>
        <p>
          {t.rich('legal.terms.contact.description', {
            email: (chunks) => (
              <a className="text-primary underline" href={`mailto:${links.email}`}>
                {chunks}
              </a>
            ),
          })}
        </p>
      </section>
    </div>
  )
}

export default TermsOfServiceContent
