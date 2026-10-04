import { useEffect, useRef } from 'react'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type CardConfirmProps = {
  className?: string
  confirmLabel: string
  message: string
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

// Inline "are you sure?" row inside a card, for removing it from the form.
// Focus starts on Cancel so a stray Enter never removes anything; Esc cancels.
const CardConfirm = ({
  className,
  confirmLabel,
  message,
  onCancel,
  onConfirm,
}: CardConfirmProps) => {
  const t = useTranslations()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    rootRef.current?.querySelector('button')?.focus({ preventScroll: true })
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onCancel()
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'border-danger-border bg-surface flex flex-wrap items-center gap-2 rounded-[10px] border px-3 py-2',
        className,
      )}
      onKeyDown={handleKeyDown}
      role="alert"
    >
      <span className="text-copy-sm text-ink mr-auto font-semibold">{message}</span>
      <Button onClick={onCancel} size="sm" variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button className="bg-danger hover:bg-danger/90" onClick={onConfirm} size="sm">
        {confirmLabel}
      </Button>
    </div>
  )
}

export default CardConfirm
