import { Icon } from '@components/icons'
import { SheetHeader, SheetStepButtons } from '@ds/patterns'
import { Tooltip } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { AvalancheSheetNavigation } from './types'

import { routes } from '@/routes'

type AvalancheSheetHeaderProps = {
  // Hidden while editing — leaving the panel would drop the edits
  fullPageId: number | null
  // Hidden while editing, for the same reason
  navigation: AvalancheSheetNavigation | null
  title: string
}

const AvalancheSheetHeader = ({ fullPageId, navigation, title }: AvalancheSheetHeaderProps) => {
  const t = useTranslations()
  const fullPageLabel = t('admin.recentAvalanches.view.openFullPage')
  const hasSteps = navigation && (navigation.hasNext || navigation.hasPrevious)

  return (
    <SheetHeader closeLabel={t('common.actions.close')} title={title}>
      {hasSteps && (
        <>
          {navigation.index !== null && (
            <span className="text-muted text-copy-sm tabular-nums">
              {t('admin.recentAvalanches.sheet.position', {
                current: navigation.index + 1,
                total: navigation.total,
              })}
            </span>
          )}
          <SheetStepButtons
            nextLabel={t('admin.recentAvalanches.sheet.next')}
            previousLabel={t('admin.recentAvalanches.sheet.previous')}
            steps={navigation}
          />
        </>
      )}
      {fullPageId !== null && (
        <Tooltip label={fullPageLabel}>
          <Link
            aria-label={fullPageLabel}
            className="focus-ring hover:bg-tile rounded-control grid size-10 shrink-0 place-items-center transition-colors"
            href={routes.admin.recentAvalanches.view(fullPageId)}
          >
            <Icon icon="externalLink" size="sm" />
          </Link>
        </Tooltip>
      )}
    </SheetHeader>
  )
}

export default AvalancheSheetHeader
