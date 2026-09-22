'use client'

import type { AvalancheSource } from '@domain/types'

import DetailsSection from './DetailsSection'
import SubmitterSection from './SubmitterSection'
import TopSection from './TopSection'

type FormFieldsProps = {
  source: AvalancheSource | undefined
}

const FormFields = ({ source }: FormFieldsProps) => (
  <div className="flex flex-col gap-6">
    <TopSection />
    <DetailsSection />
    <SubmitterSection isExternal={source === 'external'} source={source} />
  </div>
)

export default FormFields
