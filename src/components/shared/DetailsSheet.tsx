'use client'

import { useState } from 'react'
import { Sheet, SheetHeader } from '@ds/patterns'
import { useTranslations } from 'next-intl'

type DetailsSheetProps = {
  children: React.ReactNode
  title: string
  // The button that opens it
  trigger: React.ReactElement
}

// Read-only details opened from a button (a partner, a document): a Sheet that
// keeps its own open state
const DetailsSheet = ({ children, title, trigger }: DetailsSheetProps) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet
      header={<SheetHeader closeLabel={t('common.actions.close')} title={title} />}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
    >
      <div className="p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">{children}</div>
    </Sheet>
  )
}

export default DetailsSheet
