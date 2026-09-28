'use client'

import { StickyActionBar } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'
import useMissingRequiredFields from './useMissingRequiredFields'

const emphasize = (chunks: React.ReactNode) => <b className="text-ink font-semibold">{chunks}</b>

// The Submit label never changes — while a submission waits for photo uploads,
// the status text and a spinner explain what's happening
const SubmitBar = ({ isWaitingForPhotos }: { isWaitingForPhotos: boolean }) => {
  const t = useTranslations()
  const { isSubmitting } = useFormState<ObservationSubmitFormSchema>()
  const missingFields = useMissingRequiredFields()

  const getStatus = () => {
    if (isWaitingForPhotos) return t('observations.submit.waitingForPhotos')
    if (missingFields.length === 0) return emphasize(t('observations.submit.status.ready'))

    return t.rich('observations.submit.status.missing', {
      b: emphasize,
      count: missingFields.length,
      fields: missingFields
        .map((field) => t(`observations.submit.status.fields.${field}`))
        .join(', '),
    })
  }

  return (
    <StickyActionBar
      action={
        <Button isBusy={isWaitingForPhotos || isSubmitting} size="lg" type="submit">
          {t('observations.submit.submit')}
        </Button>
      }
      announcement={isWaitingForPhotos ? t('observations.submit.waitingForPhotos') : undefined}
      className="-mx-4 mt-1 md:mx-0"
      status={getStatus()}
    />
  )
}

export default SubmitBar
