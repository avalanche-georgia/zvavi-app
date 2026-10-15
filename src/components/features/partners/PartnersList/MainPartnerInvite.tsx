import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import MainPartnerTag from './MainPartnerTag'
import { partnerLinkClasses } from './PartnerLink'

import { routes } from '@/routes'

// While there is no main partner: the tier-1 card as an open spot
const MainPartnerInvite = () => {
  const t = useTranslations()

  return (
    <article className="rounded-card border-rule-strong flex flex-col items-start gap-4.5 border border-dashed p-5 md:flex-row md:items-center md:gap-7 md:p-7">
      <span
        aria-hidden
        className="rounded-card border-rule-strong text-muted text-micro grid size-28 shrink-0 place-items-center border-2 border-dashed font-mono md:size-42"
      >
        {t('partners.page.invite.logoSlot')}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <MainPartnerTag />
        <h2 className="text-title-sm md:text-title font-semibold">
          {t('partners.page.invite.title')}
        </h2>
        <p className="text-body text-copy-lg max-w-[68ch] text-pretty">
          {t('partners.page.invite.message')}
        </p>
        <Link className={partnerLinkClasses} href={routes.about.contact}>
          {t('partners.page.invite.action')}
          <ArrowRight aria-hidden className="size-3.5 shrink-0" />
        </Link>
      </div>
    </article>
  )
}

export default MainPartnerInvite
