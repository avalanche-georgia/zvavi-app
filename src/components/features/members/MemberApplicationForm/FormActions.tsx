'use client'

import { useState } from 'react'
import { ConfirmationDialog } from '@components/shared'
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
  const handleConfirmCancel = () => setIsConfirmOpen(false)

  const handleCancel = () => {
    if (!isDirty) return leave()

    setIsConfirmOpen(true)
  }

  return (
    <div className="flex justify-end gap-2.5 pt-1">
      <Button onClick={handleCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onCancel={handleConfirmCancel}
        onConfirm={leave}
        type="leave"
      />
      <Button isBusy={isSubmitting} type="submit">
        {t('common.actions.submit')}
      </Button>
    </div>
  )
}

export default FormActions
