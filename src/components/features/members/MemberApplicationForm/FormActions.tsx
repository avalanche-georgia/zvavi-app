'use client'

import { useRef, useState } from 'react'
import { Button, ConfirmPopover } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Cancel · Submit. Cancel asks first once something is filled in — leaving drops it.
const FormActions = () => {
  const t = useTranslations()
  const router = useRouter()
  const { isDirty, isSubmitting } = useFormState()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const leave = () => router.push(routes.about.joinUs)

  const handleCancel = () => {
    if (!isDirty) return leave()

    setIsConfirmOpen(true)
  }

  return (
    <div className="flex justify-end gap-2.5 pt-1">
      <Button ref={cancelRef} onClick={handleCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <ConfirmPopover
        anchor={cancelRef}
        cancelLabel={t('joinUs.apply.leave.stay')}
        confirmLabel={t('joinUs.apply.leave.confirm')}
        isOpen={isConfirmOpen}
        message={t('joinUs.apply.leave.message')}
        onConfirm={leave}
        onOpenChange={setIsConfirmOpen}
      />
      <Button isBusy={isSubmitting} type="submit">
        {t('common.actions.submit')}
      </Button>
    </div>
  )
}

export default FormActions
