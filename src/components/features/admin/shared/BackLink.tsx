import { ArrowLeft } from 'lucide-react'
import { Link } from 'src/i18n/navigation'

import { LinkPendingIndicator } from './list'

type BackLinkProps = {
  children: React.ReactNode
  href: string
}

// Quiet "← List" link above a record page
const BackLink = ({ children, href }: BackLinkProps) => (
  <Link
    className="text-copy-sm text-muted hover:text-ink focus-ring flex w-fit items-center gap-1"
    href={href}
  >
    <ArrowLeft aria-hidden className="size-3.75" />
    {children}
    <LinkPendingIndicator />
  </Link>
)

export default BackLink
