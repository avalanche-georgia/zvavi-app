import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

type NewTabLinkProps = {
  children: React.ReactNode
  className?: string
  hasIcon?: boolean
  href: string
}

// Opens in a new tab (an external site, or a page that mustn't replace a form); screen readers hear that it opens one
const NewTabLink = ({ children, className, hasIcon = false, href }: NewTabLinkProps) => {
  const t = useTranslations()

  return (
    <Link className={className} href={href} rel="noopener noreferrer" target="_blank">
      {children}
      {hasIcon && <ExternalLink aria-hidden className="text-muted size-4" />}
      <span className="sr-only">{` (${t('common.labels.opensInNewTab')})`}</span>
    </Link>
  )
}

export default NewTabLink
