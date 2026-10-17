import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

type StationPopupProps = {
  altitude: number
  name: string
  url: string
}

// Rendered inside a Leaflet popup — Leaflet owns the box, this is the content
const StationPopup = ({ altitude, name, url }: StationPopupProps) => {
  const t = useTranslations()

  return (
    <div className="flex min-w-40 flex-col gap-1">
      <p className="text-copy text-ink m-0! font-semibold">{name}</p>
      <p className="text-caption text-muted m-0! tabular-nums">
        {t('common.units.meters', { value: altitude })}
      </p>
      <a
        className="focus-ring text-copy text-accent! hover:text-accent-hover! mt-1 inline-flex items-center gap-1.5 rounded-sm hover:underline"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('common.actions.open')}
        <ExternalLink aria-hidden className="size-3.5" />
      </a>
    </div>
  )
}

export default StationPopup
