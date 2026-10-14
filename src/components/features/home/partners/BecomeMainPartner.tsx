import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// While there is no main partner: an empty logo slot and an invitation
const BecomeMainPartner = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card border-rule-strong bg-canvas grid items-center gap-5 border-2 border-dashed p-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-7 md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <span
          aria-hidden
          className="rounded-media border-rule-strong text-placeholder grid h-16 w-30 shrink-0 place-items-center border-2 border-dashed font-mono text-[10px]"
        >
          {t('home.partners.empty.logoSlot')}
        </span>
        <div>
          <b className="block text-xl font-bold tracking-[-0.02em]">
            {t('home.partners.empty.title')}
          </b>
          <p className="text-body text-copy mt-1.5 max-w-[58ch] text-pretty">
            {t('home.partners.empty.message')}
          </p>
        </div>
      </div>
      <Link
        className={getButtonClasses({ className: 'justify-self-start' })}
        href={routes.about.contact}
      >
        {t('home.partners.empty.action')}
      </Link>
    </div>
  )
}

export default BecomeMainPartner
