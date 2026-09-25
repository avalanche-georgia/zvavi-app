import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { observationPhotoLimits } from '@domain/constants'
import { useTranslations } from 'next-intl'

import { getPhotoRejectionReason, maxSourceSizeMb, type PhotoRejectionReason } from './preparePhoto'

const { maxCount } = observationPhotoLimits

// Filters a picked/dropped batch down to what can actually be queued, naming
// the offending files in the toast so the submitter knows which one to fix.
const usePhotoSelectionFeedback = () => {
  const t = useTranslations()
  const { toastError } = useToast()

  const showError = useCallback(
    (message: string) => toastError('PhotosField', { message }),
    [toastError],
  )

  const filterSelectedFiles = (files: File[], remainingSlots: number): File[] => {
    const rejectedNames: Record<PhotoRejectionReason, string[]> = { tooLarge: [], unsupported: [] }
    const validFiles = files.filter((file) => {
      const reason = getPhotoRejectionReason(file)

      if (reason) rejectedNames[reason].push(file.name)

      return !reason
    })

    Object.entries(rejectedNames).forEach(([reason, names]) => {
      if (names.length === 0) return

      showError(
        t(`observations.submit.photos.errors.${reason}`, {
          files: names.join(', '),
          maxSize: maxSourceSizeMb,
        }),
      )
    })

    const skippedCount = validFiles.length - Math.max(remainingSlots, 0)

    if (skippedCount > 0) {
      showError(
        t('observations.submit.photos.errors.tooMany', { max: maxCount, skipped: skippedCount }),
      )
    }

    return validFiles.slice(0, Math.max(remainingSlots, 0))
  }

  const handlePhotoUnreadable = useCallback(
    (fileName: string) =>
      showError(t('observations.submit.photos.errors.unreadable', { file: fileName })),
    [showError, t],
  )

  return { filterSelectedFiles, handlePhotoUnreadable }
}

export default usePhotoSelectionFeedback
