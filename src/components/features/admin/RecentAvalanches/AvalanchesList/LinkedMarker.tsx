import { Tooltip } from '@ds/primitives'
import { Link2, Link2Off } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

// Whether any forecast links to the record: link icon + how many, or a muted
// crossed-out link. The name shows on hover and is read out in place.
const LinkedMarker = ({ count }: { count: number }) => {
  const t = useTranslations()
  const label = count
    ? t('admin.recentAvalanches.list.linked', { count })
    : t('admin.recentAvalanches.list.unlinked')
  const LinkIcon = count ? Link2 : Link2Off

  return (
    <Tooltip label={label}>
      <span
        className={cn(
          'text-caption inline-flex items-center gap-0.5 font-medium tabular-nums',
          count ? 'text-accent' : 'text-placeholder',
        )}
      >
        <LinkIcon aria-hidden className="size-3.5" />
        {count > 0 && <span aria-hidden>{count}</span>}
        <span className="sr-only">{label}</span>
      </span>
    </Tooltip>
  )
}

export default LinkedMarker
