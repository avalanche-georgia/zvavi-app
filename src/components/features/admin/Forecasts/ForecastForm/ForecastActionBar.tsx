'use client'

import { StickyActionBar } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type ForecastActionBarProps = {
  isConfirmingCancel: boolean
  isDirty: boolean
  isNew: boolean
  isSaving: boolean
  lastSavedAt: Date | null
  onCancel: VoidFunction
  onCancelConfirm: VoidFunction
  onCancelDismiss: VoidFunction
  onSave: VoidFunction
  onSaveAndClose: VoidFunction
}

const ForecastActionBar = (props: ForecastActionBarProps) => {
  const { isConfirmingCancel, isDirty, isNew, isSaving, lastSavedAt } = props
  const t = useTranslations()
  const key = 'admin.forecast.editor.actionBar'
  const savedTime = lastSavedAt && format(lastSavedAt, 'HH:mm')

  const status = (() => {
    if (isNew && !isDirty) return { dot: null, text: t(`${key}.new`) }

    if (isDirty) {
      return {
        dot: 'bg-primary',
        text: savedTime ? t(`${key}.unsavedSince`, { time: savedTime }) : t(`${key}.unsaved`),
      }
    }

    return {
      dot: 'bg-success',
      text: savedTime ? t(`${key}.savedAt`, { time: savedTime }) : t(`${key}.saved`),
    }
  })()

  const actions = isConfirmingCancel ? (
    <div className="flex items-center gap-2 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none starting:-translate-y-1 starting:opacity-0">
      <span className="text-copy-sm text-ink font-semibold">{t(`${key}.discardConfirm`)}</span>
      <Button onClick={props.onCancelDismiss} variant="secondary">
        {t(`${key}.keepEditing`)}
      </Button>
      <Button onClick={props.onCancelConfirm} variant="danger">
        {t(`${key}.discard`)}
      </Button>
    </div>
  ) : (
    <div className="flex w-full items-center gap-2 min-[560px]:w-auto">
      <Button onClick={props.onCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button
        className="flex-1 min-[560px]:flex-none"
        disabled={isSaving}
        onClick={props.onSave}
        variant="secondary"
      >
        {t(`${key}.save`)}
      </Button>
      <Button
        className="flex-1 min-[560px]:flex-none"
        isBusy={isSaving}
        onClick={props.onSaveAndClose}
      >
        {t(`${key}.saveAndClose`)}
      </Button>
    </div>
  )

  return (
    <StickyActionBar
      action={actions}
      className="flex-wrap max-[560px]:[&>div:first-child]:basis-full"
      status={
        <span className="text-copy-sm text-body flex items-center gap-2">
          {status.dot && <span aria-hidden className={cn('size-2 rounded-full', status.dot)} />}
          {status.text}
        </span>
      }
    />
  )
}

export default ForecastActionBar
