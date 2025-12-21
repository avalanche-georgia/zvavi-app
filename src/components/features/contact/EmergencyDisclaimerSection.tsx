import { HTMLContainer } from '@components/shared'
import { useTranslations } from 'next-intl'

const EmergencyDisclaimerSection = () => {
  const t = useTranslations()

  return (
    <section>
      <h4 className="mb-2 text-lg font-semibold">{t('contact.emergencyDisclaimer.title')}</h4>
      <HTMLContainer
        content={t.rich('contact.emergencyDisclaimer.description', {
          strong: (chunks) => `<strong>${chunks}</strong>`,
          u: (chunks) => `<u>${chunks}</u>`,
        })}
      />
    </section>
  )
}

export default EmergencyDisclaimerSection
