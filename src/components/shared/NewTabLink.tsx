import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

type NewTabLinkProps = {
  children: React.ReactNode
  className?: string
  hasIcon?: boolean
  href: string
}

// External link opened in a new tab; screen readers hear that it opens one
const NewTabLink = ({ children, className, hasIcon = false, href }: NewTabLinkProps) => {
  const t = useTranslations()

  return (
    <a className={className} href={href} rel="noopener noreferrer" target="_blank">
      {children}
      {hasIcon && <ExternalLink aria-hidden className="text-muted size-4" />}
      <span className="sr-only">{` (${t('common.labels.opensInNewTab')})`}</span>
    </a>
  )
}

export default NewTabLink
