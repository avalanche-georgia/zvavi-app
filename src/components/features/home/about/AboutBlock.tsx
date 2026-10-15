import { getButtonClasses } from '@ds/primitives'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const AboutBlock = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card border-rule bg-surface flex flex-col items-start gap-3 border p-5 md:p-7">
      <p className="text-caption text-muted tracking-eyebrow font-semibold uppercase">
        {t('home.about.eyebrow')}
      </p>
      <h2 className="text-title-sm font-bold">{t('home.about.title')}</h2>
      <p className="text-body max-w-[46ch] leading-[1.55] text-pretty">{t('home.about.message')}</p>
      <Link
        className={getButtonClasses({ className: 'mt-auto', variant: 'secondary' })}
        href={routes.about.aboutUs}
      >
        {t('home.about.action')}
        <ChevronRight aria-hidden className="-mr-1 size-4" />
      </Link>
    </div>
  )
}

export default AboutBlock
