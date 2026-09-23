'use client'

import { Button } from '@components/ui'
import { LoaderIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

// The label never changes — while a submission waits for photo uploads, a
// spinner plus a caption beside the button explain what's happening.
const SubmitButton = ({ isWaitingForPhotos }: { isWaitingForPhotos: boolean }) => {
  const t = useTranslations()
  const { formState } = useFormContext<ObservationSubmitFormSchema>()

  const isBusy = isWaitingForPhotos || formState.isSubmitting

  return (
    <div className="flex items-center justify-end gap-3">
      <span aria-live="polite" className="text-right text-xs text-gray-500">
        {isWaitingForPhotos && t('observations.submit.waitingForPhotos')}
      </span>
      <Button className="shrink-0" disabled={isBusy} type="submit">
        {isBusy && <LoaderIcon className="size-4 animate-spin" />}
        {t('observations.submit.submit')}
      </Button>
    </div>
  )
}

export default SubmitButton
