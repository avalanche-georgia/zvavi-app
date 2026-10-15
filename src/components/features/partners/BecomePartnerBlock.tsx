import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// The dark call to action at the end of the partners page
const BecomePartnerBlock = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card bg-ink grid gap-6 p-5.5 text-white md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-7">
      <div className="flex flex-col gap-1.5">
        <p className="text-caption tracking-eyebrow font-semibold text-white/60 uppercase">
          {t('partners.page.become.eyebrow')}
        </p>
        <h2 className="text-title-sm font-bold">{t('partners.page.become.title')}</h2>
        <p className="max-w-[56ch] leading-[1.55] text-pretty text-white/80">
          {t('partners.page.become.message')}
        </p>
      </div>
      <Link
        className={getButtonClasses({ className: 'w-full sm:w-auto' })}
        href={routes.about.contact}
      >
        {t('common.actions.getInTouch')}
      </Link>
    </div>
  )
}

export default BecomePartnerBlock
