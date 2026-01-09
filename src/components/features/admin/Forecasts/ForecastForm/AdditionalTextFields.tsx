import type { BaseFormData } from '@domain/types'

import TextAreaField from './TextAreaField'

type AdditionalTextFieldsProps = {
  formData: BaseFormData
  onChange: (
    fieldName: keyof BaseFormData,
  ) => (value: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const AdditionalTextFields = ({ formData, onChange }: AdditionalTextFieldsProps) => {
  return (
    <>
      <div className="flex items-center gap-6">
        <TextAreaField formData={formData} onChange={onChange('snowpack')} type="snowpack" />
        <TextAreaField formData={formData} onChange={onChange('weather')} type="weather" />
      </div>
      <TextAreaField
        formData={formData}
        onChange={onChange('additionalHazards')}
        type="additionalHazards"
      />
    </>
  )
}

export default AdditionalTextFields
