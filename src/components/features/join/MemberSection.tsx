import { ContentCard } from '@ds/patterns'
import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import PartnerBenefitsSheet from './PartnerBenefitsSheet'

import { routes } from '@/routes'

// Membership: what it is, the application, and partner perks for members
const MemberSection = () => {
  const t = useTranslations()

  return (
    <ContentCard title={t('joinUs.page.member.title')}>
      <p>{t('joinUs.page.member.description')}</p>
      <div className="flex flex-wrap gap-2">
        <Link className={getButtonClasses()} href={routes.about.apply}>
          {t('joinUs.page.member.action')}
        </Link>
        <PartnerBenefitsSheet />
      </div>
    </ContentCard>
  )
}

export default MemberSection
