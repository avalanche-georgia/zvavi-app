'use client'

import AspectsField from './AspectsField'
import ClassificationFields from './ClassificationFields'
import DateField from './DateField'
import DescriptionField from './DescriptionField'
import HoneypotField from './HoneypotField'
import LocationMapField from './LocationMapField'
import SubmitterFields from './SubmitterFields'

const FormFields = () => (
  <div className="flex flex-col gap-6">
    <HoneypotField />
    <DateField />
    <LocationMapField />
    <ClassificationFields />
    <AspectsField />
    <DescriptionField />
    <SubmitterFields />
  </div>
)

export default FormFields
