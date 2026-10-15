import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import parsePartnerLink from './parsePartnerLink'

import { cn } from '@/lib/utils'

// Shared with the main-partner invitation link
export const partnerLinkClasses = cn(
  'focus-ring text-accent hover:text-accent-hover text-copy-sm relative inline-flex max-w-full items-center gap-1.25 self-start rounded-badge font-semibold underline-offset-3 hover:underline',
  // 44px target on touch screens only
  'after:absolute pointer-coarse:after:-inset-x-1 pointer-coarse:after:-inset-y-3',
)

type PartnerLinkProps = {
  className?: string
  name: string
  onClick?: VoidFunction
  url: string
}

// The partner's one external link, named after where it goes (website or social
// page). Nothing when the stored URL can't be shown as a link.
const PartnerLink = ({ className, name, onClick, url }: PartnerLinkProps) => {
  const t = useTranslations()
  const link = parsePartnerLink(url)

  if (!link) return null

  const { href, label: site } = link

  return (
    <a
      aria-label={`${t('partners.page.linkLabel', { name, site })} (${t('common.labels.opensInNewTab')})`}
      className={cn(partnerLinkClasses, className)}
      href={href}
      onClick={onClick}
      rel="noopener noreferrer sponsored"
      target="_blank"
    >
      <span className="truncate">{site}</span>
      <ArrowUpRight aria-hidden className="size-3.5 shrink-0" />
    </a>
  )
}

export default PartnerLink
