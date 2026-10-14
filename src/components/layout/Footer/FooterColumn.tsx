import { Link } from 'src/i18n/navigation'

export type FooterLink = {
  href: string
  label: string
}

type FooterColumnProps = {
  links: FooterLink[]
  title: string
}

const FooterColumn = ({ links, title }: FooterColumnProps) => (
  <nav aria-label={title}>
    <h2 className="text-muted mb-3 text-xs font-semibold tracking-[.06em] uppercase">{title}</h2>
    <ul>
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            className="focus-ring text-copy text-ink hover:text-primary inline-block rounded-sm py-1.5 transition-colors md:py-1"
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default FooterColumn
