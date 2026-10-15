import { links } from '@components/constants'
import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes, sectionIds } from '@/routes'

const externalLinkClasses = getButtonClasses({ variant: 'secondary' })

// Patreon · Wise · bank details. Anchor target of "Donate" links (routes.about.donate)
const FinancialSection = () => {
  const t = useTranslations()

  return (
    <ContentCard id={sectionIds.donate} title={t('joinUs.page.financialSupport.title')}>
      <p>{t('joinUs.page.financialSupport.description')}</p>
      <div className="flex flex-wrap gap-2">
        <a className={externalLinkClasses} href={links.patreon} rel="noreferrer" target="_blank">
          {t('joinUs.page.financialSupport.patreon')}
          <ExternalLink aria-hidden className="text-muted size-4" />
        </a>
        <a className={externalLinkClasses} href={links.wise} rel="noreferrer" target="_blank">
          {t('joinUs.page.financialSupport.wise')}
          <ExternalLink aria-hidden className="text-muted size-4" />
        </a>
      </div>
      <Link
        className={getButtonClasses({ className: 'self-start', variant: 'text' })}
        href={routes.about.bank}
      >
        {t('joinUs.page.financialSupport.bank')}
      </Link>
    </ContentCard>
  )
}

export default FinancialSection
