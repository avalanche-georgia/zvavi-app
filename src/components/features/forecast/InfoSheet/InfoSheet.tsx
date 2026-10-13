'use client'

import { Sheet, SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { ChevronLeft, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type InfoSheetProps = {
  // Name of the sheet underneath; without it there is nothing to go back to
  backLabel?: string
  children: React.ReactNode
  isOpen: boolean
  // Closes this sheet only (also Esc, backdrop, swipe)
  onBack: VoidFunction
  // The × — closes this sheet and the one underneath
  onCloseAll: VoidFunction
  title: string
}

// Explanation sheet. Opened on its own (danger level) or stacked over the
// problem sheet — shorter on mobile so the sheet underneath stays visible.
const InfoSheet = ({ backLabel, children, isOpen, onBack, onCloseAll, title }: InfoSheetProps) => {
  const t = useTranslations()

  const handleOpenChange = (isNextOpen: boolean) => {
    if (!isNextOpen) onBack()
  }

  return (
    <Sheet
      className="max-h-[82dvh]"
      header={
        <>
          <SheetTitle className="sr-only">{title}</SheetTitle>
          {backLabel && (
            <SheetClose className="focus-ring hover:bg-tile rounded-control text-copy flex h-10 min-w-0 items-center gap-1 pr-3 pl-1.5 font-semibold transition-colors">
              <ChevronLeft aria-hidden className="size-4.5 shrink-0" />
              <span className="sr-only">{t('forecast.page.back')}: </span>
              <span className="truncate">{backLabel}</span>
            </SheetClose>
          )}
          <span className="flex-1" />
          <SheetIconButton aria-label={t('common.actions.close')} onClick={onCloseAll}>
            <X aria-hidden className="size-4.5" />
          </SheetIconButton>
        </>
      }
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <div className="pb-[calc(24px+env(safe-area-inset-bottom))]">{children}</div>
    </Sheet>
  )
}

export default InfoSheet
