'use client'

import { useState } from 'react'
import { useToast } from '@components/hooks'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'
import { useFormContext, useFormState } from 'react-hook-form'

import ReportingAsRow from './ReportingAsRow'
import SubmitterFields from './SubmitterFields'
import usePrefillSubmitterDetails from '../../hooks/usePrefillSubmitterDetails'
import type { ObservationSubmitFormSchema } from '../../schema'
import { forgetSubmitterDetails, useSavedSubmitterDetails } from '../../submitterDetailsStorage'

const AboutYouSection = () => {
  const t = useTranslations()
  const { toastInfo } = useToast()
  const { control, resetField } = useFormContext<ObservationSubmitFormSchema>()
  const { errors } = useFormState({
    control,
    name: ['submitterContact', 'submitterEducation', 'submitterName'],
  })
  const savedDetails = useSavedSubmitterDetails()
  const [isEditing, setIsEditing] = useState(false)

  usePrefillSubmitterDetails(savedDetails)

  // Errors must stay visible, so a problem with saved details opens the fields
  const hasErrors = !!(errors.submitterContact || errors.submitterEducation || errors.submitterName)
  const isCompact = !!savedDetails && !isEditing && !hasErrors

  const handleEdit = () => setIsEditing(true)

  const handleForget = () => {
    forgetSubmitterDetails()
    resetField('submitterName', { defaultValue: '' })
    resetField('submitterEducation', { defaultValue: null })
    resetField('submitterContact', { defaultValue: null })
    resetField('rememberDetails', { defaultValue: false })
    setIsEditing(false)
    toastInfo(t('observations.submit.aboutYou.forgotten'))
  }

  return (
    <FormCard
      title={t(
        isCompact
          ? 'observations.submit.aboutYou.reportingAs'
          : 'observations.submit.sections.aboutYou',
      )}
    >
      {isCompact && (
        <ReportingAsRow details={savedDetails} onEdit={handleEdit} onForget={handleForget} />
      )}
      {/* Stays mounted while hidden: RHF only resets (prefills) registered fields */}
      <div className="flex flex-col gap-5" hidden={isCompact}>
        <SubmitterFields onForget={savedDetails ? handleForget : undefined} />
      </div>
    </FormCard>
  )
}

export default AboutYouSection
