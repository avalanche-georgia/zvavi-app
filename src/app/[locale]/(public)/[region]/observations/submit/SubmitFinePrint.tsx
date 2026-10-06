import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const linkClassName =
  'text-accent hover:text-accent-hover focus-ring underline-offset-2 hover:underline'

const termsLink = (chunks: React.ReactNode) => (
  <Link className={linkClassName} href={routes.terms}>
    {chunks}
  </Link>
)

const privacyLink = (chunks: React.ReactNode) => (
  <Link className={linkClassName} href={routes.privacy}>
    {chunks}
  </Link>
)

const SubmitFinePrint = () => {
  const t = useTranslations()

  return (
    <p className="text-caption text-muted pt-1 pb-4.5 text-center text-pretty">
      {t.rich('observations.submit.finePrint', { privacy: privacyLink, terms: termsLink })}
    </p>
  )
}

export default SubmitFinePrint
