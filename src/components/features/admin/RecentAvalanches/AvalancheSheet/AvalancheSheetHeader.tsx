import { Icon } from '@components/icons'
import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  const index = navigation?.index ?? null
  const total = navigation?.total ?? 0

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X className="size-4.5" />
      </SheetClose>
      <SheetTitle className="m-0 flex-1 truncate text-[15px] font-semibold">{title}</SheetTitle>
      {navigation && total > 1 && (
        <>
          {index !== null && (
            <span className="text-muted text-[13px] tabular-nums">
              {t('admin.recentAvalanches.sheet.position', { current: index + 1, total })}
            </span>
          )}
          <SheetIconButton
            aria-label={t('admin.recentAvalanches.sheet.previous')}
            disabled={index === null || index <= 0}
            onClick={navigation.onPrevious}
          >
            <ChevronLeft className="size-4.5" />
          </SheetIconButton>
          <SheetIconButton
            aria-label={t('admin.recentAvalanches.sheet.next')}
            disabled={index === null || index >= total - 1}
            onClick={navigation.onNext}
          >
            <ChevronRight className="size-4.5" />
          </SheetIconButton>
        </>
      )}
      {fullPageId !== null && (
        <Link
          aria-label={t('admin.recentAvalanches.view.openFullPage')}
          className="hover:bg-tile grid size-10 shrink-0 place-items-center rounded-[10px] transition-colors"
          href={routes.admin.recentAvalanches.view(fullPageId)}
        >
          <Icon icon="externalLink" size="sm" />
        </Link>
      )}
    </>
  )
}

export default AvalancheSheetHeader
