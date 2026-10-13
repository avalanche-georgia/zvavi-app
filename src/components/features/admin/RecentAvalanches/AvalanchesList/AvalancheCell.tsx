import { formatAvalancheId } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { OnAvalancheOpen } from './types'

import { routes } from '@/routes'

type AvalancheCellProps = {
  avalanche: AvalancheListItem
  onOpen: OnAvalancheOpen
}

// Avalanche type (opens the record) + its catalog id
const AvalancheCell = ({ avalanche: { id, type }, onOpen }: AvalancheCellProps) => {
  const t = useTranslations()

  // Opens the side panel; a modified click (new tab / window) still follows the
  // link to the full page
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return

    event.preventDefault()
    onOpen(id)
  }

  return (
    <div className="flex min-w-0 flex-col items-start gap-0.5">
      <Link
        className="focus-ring text-ink hover:text-accent max-w-full truncate rounded-sm font-semibold hover:underline"
        href={routes.admin.recentAvalanches.view(id)}
        onClick={handleClick}
      >
        {t(`common.avalancheTypes.${type}`)}
      </Link>
      <span className="text-caption text-muted font-mono">{formatAvalancheId(id)}</span>
    </div>
  )
}

export default AvalancheCell
