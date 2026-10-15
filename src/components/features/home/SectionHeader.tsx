import { ChevronRight } from 'lucide-react'
import { Link } from 'src/i18n/navigation'

type SectionHeaderProps = {
  href: string
  id: string
  linkLabel: string
  title: string
}

// Section title with a "See all ›" link on the right
const SectionHeader = ({ href, id, linkLabel, title }: SectionHeaderProps) => (
  <div className="mb-4.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
    <h2 className="text-title-sm font-bold" id={id}>
      {title}
    </h2>
    <Link
      className="focus-ring text-accent hover:text-accent-hover text-copy ml-auto flex items-center gap-0.5 rounded-sm font-semibold"
      href={href}
    >
      {linkLabel}
      <ChevronRight aria-hidden className="size-4" />
    </Link>
  </div>
)

export default SectionHeader
