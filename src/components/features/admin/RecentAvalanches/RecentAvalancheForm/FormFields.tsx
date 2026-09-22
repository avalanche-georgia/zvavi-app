'use client'

import type { Avalanche } from '@domain/types'

import DetailsSection from './DetailsSection'
import SubmitterSection from './SubmitterSection'
import TopSection from './TopSection'

type FormFieldsProps = {
  // undefined when creating a new record
  avalanche: Avalanche | undefined
}

const FormFields = ({ avalanche }: FormFieldsProps) => (
  <div className="flex flex-col gap-6">
    <TopSection />
    <DetailsSection />
    <SubmitterSection
      createdByUserId={avalanche?.createdByUserId ?? null}
      source={avalanche?.source}
      submitterContact={avalanche?.submitterContact ?? null}
      submitterEducation={avalanche?.submitterEducation ?? null}
      submitterName={avalanche?.submitterName ?? null}
    />
  </div>
)

export default FormFields
