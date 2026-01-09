import { Textarea } from '@components/ui'
import type { BaseFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

type TextAreaFieldProps = {
  formData: BaseFormData
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
  type: 'additionalHazards' | 'snowpack' | 'summary' | 'weather'
}

const TextAreaField = ({ formData, onChange, type }: TextAreaFieldProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-1 flex-col gap-4 pt-1.5">
      <h4 className="font-semibold">{t(`admin.forecast.form.general.labels.${type}`)}</h4>
      <Textarea className="w-full" onChange={onChange} rows={6} value={formData[type] ?? ''} />
    </div>
  )
}

export default TextAreaField
