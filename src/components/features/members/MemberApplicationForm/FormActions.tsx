'use client'

import { useState } from 'react'
import { ConfirmDialog } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Cancel · Submit. Cancel asks first once something is filled in — leaving drops it.
const FormActions = () => {
  const t = useTranslations()
  const router = useRouter()
  const { isDirty, isSubmitting } = useFormState()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const leave = () => router.push(routes.about.joinUs)

  const handleCancel = () => {
    if (!isDirty) return leave()

    setIsConfirmOpen(true)
  }

  return (
    <div className="flex justify-end gap-2.5 pt-1">
      <Button onClick={handleCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <ConfirmDialog
        cancelLabel={t('joinUs.apply.leave.stay')}
        confirmLabel={t('joinUs.apply.leave.confirm')}
        isOpen={isConfirmOpen}
        onConfirm={leave}
        onOpenChange={setIsConfirmOpen}
        title={t('joinUs.apply.leave.message')}
        tone="danger"
      />
      <Button isBusy={isSubmitting} type="submit">
        {t('common.actions.submit')}
      </Button>
    </div>
  )
}

export default FormActions
