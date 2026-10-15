import { AnalyticsPreferencesButton } from '@components/shared/AnalyticsConsent'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const linkClasses = 'focus-ring text-muted hover:text-ink rounded-sm transition-colors'

// Emergency number and copyright · legal links and the analytics choice
const FooterBottom = () => {
  const t = useTranslations()

  return (
    <div className="border-rule text-caption text-muted flex flex-col gap-3 border-t pt-4.5 pb-6 md:flex-row md:items-center md:gap-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="text-ink font-medium">
          {t('footer.emergency')}{' '}
          <a className="focus-ring text-alert-ink rounded-sm font-bold" href="tel:112">
            112
          </a>
        </span>
        <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:ml-auto">
        <Link className={linkClasses} href={routes.privacy}>
          {t('legal.privacy.title')}
        </Link>
        <Link className={linkClasses} href={routes.terms}>
          {t('legal.terms.title')}
        </Link>
        <AnalyticsPreferencesButton className={linkClasses} />
      </div>
    </div>
  )
}

export default FooterBottom
