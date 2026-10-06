'use client'

import { Sheet, SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { FooterActions } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PickerResults from './PickerResults'
import PickerToolbar from './PickerToolbar'
import usePickerFilters from './usePickerFilters'

type AvalanchePickerSheetProps = {
  avalanches: LinkableAvalanche[]
  catalogName: string
  isOpen: boolean
  isPending: boolean
  linkedIds: number[]
  onClose: VoidFunction
  onLink: (ids: number[]) => void
}

// "Add existing": pick records from the region's catalog to link
const AvalanchePickerSheet = (props: AvalanchePickerSheetProps) => {
  const { avalanches, catalogName, isOpen, isPending, linkedIds, onClose, onLink } = props
  const t = useTranslations()
  const key = 'admin.forecast.editor.avalanches.picker'
  const filters = usePickerFilters(avalanches)
  const { selectedIds, visible } = filters

  const handleOpenChange = (open: boolean) => {
    if (open) return

    filters.reset()
    onClose()
  }

  const handleLink = () => {
    onLink(selectedIds)
    filters.reset()
  }

  const footer = (
    <FooterActions note={t(`${key}.footerHint`)}>
      <Button onClick={() => handleOpenChange(false)} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button disabled={!selectedIds.length} onClick={handleLink}>
        {selectedIds.length
          ? t(`${key}.linkCount`, { count: selectedIds.length })
          : t(`${key}.link`)}
      </Button>
    </FooterActions>
  )

  return (
    <Sheet
      footer={footer}
      header={
        <>
          <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
            <X className="size-4.5" />
          </SheetClose>
          <div className="flex min-w-0 flex-1 flex-col">
            <SheetTitle className="m-0 truncate text-[15px] font-semibold">
              {t(`${key}.title`)}
            </SheetTitle>
            <span className="text-caption text-muted">{catalogName}</span>
          </div>
        </>
      }
      isOpen={isOpen}
      isTall
      onOpenChange={handleOpenChange}
    >
      <PickerToolbar
        onPeriodChange={filters.setPeriod}
        onQueryChange={filters.setQuery}
        period={filters.period}
        query={filters.query}
      />
      <p className="text-caption text-muted flex justify-between px-4 pt-3 pb-1">
        <span>{t(`${key}.count`, { count: visible.length })}</span>
        <span>{t(`${key}.newestFirst`)}</span>
      </p>
      <PickerResults
        avalanches={visible}
        isPending={isPending}
        linkedIds={linkedIds}
        onToggle={filters.toggle}
        selectedIds={selectedIds}
      />
    </Sheet>
  )
}

export default AvalanchePickerSheet
