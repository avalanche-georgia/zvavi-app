import { Link } from 'src/i18n/navigation'

type QuickLinkTileProps = {
  href: string
  icon: React.ReactNode
  label: string
  note?: string
}

// Icon box, a label and a muted line under it
const QuickLinkTile = ({ href, icon, label, note }: QuickLinkTileProps) => (
  <Link
    className="focus-ring border-rule bg-surface text-ink hover:border-rule-strong rounded-card flex h-full flex-col gap-2 border p-3 transition-colors"
    href={href}
  >
    <span
      aria-hidden
      className="bg-tile text-body rounded-control grid size-9 place-items-center [&>svg]:size-4.5"
    >
      {icon}
    </span>
    <span className="min-w-0">
      <b className="text-copy-sm block leading-tight font-semibold wrap-break-word hyphens-auto">
        {label}
      </b>
      {note && <span className="text-muted text-caption mt-0.5 block">{note}</span>}
    </span>
  </Link>
)

export default QuickLinkTile
