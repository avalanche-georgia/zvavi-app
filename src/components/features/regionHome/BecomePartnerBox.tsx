// The Button module directly, not the barrel: this is a server component
import { getButtonClasses } from '@ds/primitives/Button'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Shown while there is no main partner: an invitation to become one
const BecomePartnerBox = () => {
  const t = useTranslations()

  return (
    <div className="border-rule-strong bg-canvas rounded-card flex flex-col items-center gap-2.5 border-2 border-dashed px-4 py-4.5 text-center">
      <b className="text-heading font-bold">{t('partners.main.placeholder.title')}</b>
      <p className="text-body text-copy-sm max-w-95 text-pretty">
        {t('regionHome.partners.pitch')}
      </p>
      <Link
        className={getButtonClasses({ className: 'mt-0.5', size: 'sm' })}
        href={routes.about.contact}
      >
        {t('regionHome.partners.becomePartner')}
        <ChevronRight aria-hidden className="size-4.5" />
      </Link>
    </div>
  )
}

export default BecomePartnerBox
