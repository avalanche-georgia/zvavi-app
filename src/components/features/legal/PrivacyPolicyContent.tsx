import { links } from '@components/constants'
import { useTranslations } from 'next-intl'

import LegalSection from './LegalSection'

const PrivacyPolicyContent = () => {
  const t = useTranslations()

  return (
    <div className="text-body text-copy space-y-6">
      <p className="text-caption text-muted">{t('legal.privacy.lastUpdated')}</p>
      <p>{t('legal.privacy.intro')}</p>

      <LegalSection
        description={t('legal.privacy.dataCollected.description')}
        items={t.raw('legal.privacy.dataCollected.items') as string[]}
        title={t('legal.privacy.dataCollected.title')}
      />

      <LegalSection
        description={t('legal.privacy.purpose.description')}
        items={t.raw('legal.privacy.purpose.items') as string[]}
        title={t('legal.privacy.purpose.title')}
      />

      <LegalSection
        description={t('legal.privacy.observations.description')}
        details={t('legal.privacy.observations.details')}
        items={t.raw('legal.privacy.observations.items') as string[]}
        title={t('legal.privacy.observations.title')}
      />

      <LegalSection
        description={t('legal.privacy.deviceStorage.description')}
        title={t('legal.privacy.deviceStorage.title')}
      />

      <LegalSection
        description={t('legal.privacy.storage.description')}
        title={t('legal.privacy.storage.title')}
      />

      <LegalSection
        description={t('legal.privacy.analytics.description')}
        details={t('legal.privacy.analytics.details')}
        items={t.raw('legal.privacy.analytics.items') as string[]}
        title={t('legal.privacy.analytics.title')}
      />

      <LegalSection
        description={t('legal.privacy.necessaryStorage.description')}
        title={t('legal.privacy.necessaryStorage.title')}
      />

      <LegalSection
        description={t('legal.privacy.access.description')}
        title={t('legal.privacy.access.title')}
      />

      <LegalSection
        description={t('legal.privacy.retention.description')}
        title={t('legal.privacy.retention.title')}
      />

      <section className="space-y-2">
        <h3 className="text-heading text-ink font-semibold">{t('legal.privacy.rights.title')}</h3>
        <p>{t('legal.privacy.rights.description')}</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          {(t.raw('legal.privacy.rights.items') as string[]).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          {t.rich('legal.privacy.rights.contact', {
            email: (chunks) => (
              <a className="text-primary underline" href={`mailto:${links.email}`}>
                {chunks}
              </a>
            ),
          })}
        </p>
      </section>

      <LegalSection
        description={t('legal.privacy.changes.description')}
        title={t('legal.privacy.changes.title')}
      />
    </div>
  )
}

export default PrivacyPolicyContent
