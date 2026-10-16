import { links } from '@components/constants'
import { NewTabLink } from '@components/shared'
import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
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
        <NewTabLink className={externalLinkClasses} hasIcon href={links.patreon}>
          {t('joinUs.page.financialSupport.patreon')}
        </NewTabLink>
        <NewTabLink className={externalLinkClasses} hasIcon href={links.wise}>
          {t('joinUs.page.financialSupport.wise')}
        </NewTabLink>
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
