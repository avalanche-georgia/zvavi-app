'use client'

import {
  AspectsSection,
  DescriptionSection,
  LocationSection,
  PhotosSection,
  WhatSection,
  WhenSection,
} from '@components/features/observations/form'
import { avalancheFieldLimits } from '@domain/constants'
import type { Avalanche, Region } from '@domain/types'
import { FormTextarea, FormTextField } from '@ds/form'
import { useTranslations } from 'next-intl'

import useStoredPhotoUrls from './hooks/useStoredPhotoUrls'

import type { AvalancheFormSchema } from './schema'
import SubmitterSection from './SubmitterSection'

type FormFieldsProps = {
  // undefined when creating a new record
  avalanche: Avalanche | undefined
  region: Region
}

// Same sections as the public submit form, plus the team-only fields. Two
// columns on a wide page, one in the side panel and on phones.
const FormFields = ({ avalanche, region }: FormFieldsProps) => {
  const t = useTranslations()
  const storedPhotoUrls = useStoredPhotoUrls(avalanche)

  return (
    <div className="grid grid-cols-1 items-start gap-3 @4xl:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-3">
        <WhenSection />
        <LocationSection region={region}>
          <FormTextField<AvalancheFormSchema>
            hint={t('admin.recentAvalanches.form.hints.location')}
            label={t('admin.recentAvalanches.form.labels.location')}
            name="location"
          />
        </LocationSection>
        <AspectsSection />
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <WhatSection />
        <PhotosSection storedPhotoUrls={storedPhotoUrls} />
        <DescriptionSection>
          <FormTextarea<AvalancheFormSchema>
            hint={t('admin.recentAvalanches.form.hints.involvement')}
            label={t('admin.recentAvalanches.form.labels.involvement')}
            maxLength={avalancheFieldLimits.involvementMaxLength}
            name="involvement"
          />
        </DescriptionSection>
        <SubmitterSection
          createdByUserId={avalanche?.createdByUserId ?? null}
          source={avalanche?.source}
          submitterContact={avalanche?.submitterContact ?? null}
          submitterEducation={avalanche?.submitterEducation ?? null}
          submitterName={avalanche?.submitterName ?? null}
        />
      </div>
    </div>
  )
}

export default FormFields
