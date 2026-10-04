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
// Focus starts on Cancel so a stray Enter never removes anything. Esc, a press
// anywhere outside the row, or Tab-ing out of it cancels — so at most one is open.
const CardConfirm = ({
  className,
  confirmLabel,
  message,
  onCancel,
  onConfirm,
}: CardConfirmProps) => {
  const t = useTranslations()
  const rootRef = useRef<HTMLDivElement>(null)
  // The listener below is attached once; it always calls the latest onCancel
  const onCancelRef = useRef(onCancel)
  // A mouse / touch press moves focus too — that case is the click handler's job
  const isPointerPressedRef = useRef(false)

  useEffect(() => {
    onCancelRef.current = onCancel
  }, [onCancel])

  useEffect(() => {
    rootRef.current?.querySelector('button')?.focus({ preventScroll: true })

    // On click, not pointerdown: closing shifts the cards below, which would move
    // another card's trash button away before the press completes
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onCancelRef.current()
    }

    const handlePointerDown = () => {
      isPointerPressedRef.current = true
    }

    const handlePointerEnd = () => {
      isPointerPressedRef.current = false
    }

    document.addEventListener('click', handleOutsideClick, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('pointerup', handlePointerEnd, true)
    document.addEventListener('pointercancel', handlePointerEnd, true)

    return () => {
      document.removeEventListener('click', handleOutsideClick, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('pointerup', handlePointerEnd, true)
      document.removeEventListener('pointercancel', handlePointerEnd, true)
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onCancel()
  }

  // Tab-ing out (keyboard only): pointer presses are left to the click handler,
  // which runs after the press completes — cancelling on the press itself would
  // shift the layout under the pointer
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget

    if (isPointerPressedRef.current || !next || event.currentTarget.contains(next)) return

    onCancel()
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'border-danger-border bg-surface flex flex-wrap items-center gap-2 rounded-[10px] border px-3 py-2',
        // Slides in slightly on appear
        'transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none starting:-translate-y-1 starting:opacity-0',
        className,
      )}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role="alert"
    >
      <span className="text-copy-sm text-ink mr-auto font-semibold">{message}</span>
      <Button onClick={onCancel} size="sm" variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button onClick={onConfirm} size="sm" variant="danger">
        {confirmLabel}
      </Button>
    </div>
  )
}

export default CardConfirm
