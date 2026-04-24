import { useCallback, useState } from 'react'
import { InfoIcon, Textarea } from '@components/ui'
import type {
  Avalanche,
  AvalancheFormData,
  AvalancheSize as AvalancheSizeType,
} from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheDetailsSection from './AvalancheDetailsSection'
import DateSection from './DateSection'
import Quantity from './Quantity'
import { Aspects, AvalancheSize, Footer, type SetAspectsData } from '../../common'

export type AvalancheFormProps = {
  avalancheData: AvalancheFormData
  onClose: VoidFunction
  onSave: (data: Avalanche) => void
}

type FormErrors = {
  date?: string
  trigger?: string
  type?: string
}

const validate = (data: AvalancheFormData): FormErrors => {
  const errors: FormErrors = {}

  if (!data.isDateUnknown && !data.date) errors.date = 'required'
  if (!data.type) errors.type = 'required'
  if (!data.trigger) errors.trigger = 'required'

  return errors
}

const AvalancheForm = ({ avalancheData, onClose, onSave }: AvalancheFormProps) => {
  const t = useTranslations()

  const [data, setData] = useState(avalancheData)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSizeChange = useCallback((value: AvalancheSizeType) => {
    setData((prev) => ({ ...prev, size: value }))
  }, [])

  const handleDescriptionChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, description: target.value }))
    },
    [],
  )

  const handleSave = () => {
    const formErrors = validate(data)

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)

      return
    }

    onSave({
      ...data,
      date: data.isDateUnknown ? null : data.date,
      trigger: data.trigger!,
      type: data.type!,
    })
    onClose()
  }

  return (
    <div className="flex flex-col gap-6 rounded-sm border p-3">
      <section className="grid grid-cols-2 items-start gap-x-6">
        <div className="flex flex-col gap-3">
          <DateSection data={data} error={errors.date} setData={setData} />
          <AvalancheSize onChange={handleSizeChange} value={data.size} />
          <Quantity quantity={data.quantity} setData={setData} />
        </div>

        <Aspects data={data} setData={setData as SetAspectsData} />
      </section>

      <AvalancheDetailsSection
        data={data}
        errors={{ trigger: errors.trigger, type: errors.type }}
        setData={setData}
      />

      <div className="flex flex-col gap-4 pt-1.5">
        <div className="flex items-center gap-1.5">
          <h4 className="font-semibold">{t('admin.forecast.form.common.labels.description')}</h4>
          <InfoIcon content={t('admin.forecast.form.general.formattingHint')} />
        </div>
        <Textarea
          className="w-full"
          onChange={handleDescriptionChange}
          rows={4}
          value={data.description}
        />
      </div>

      <Footer onCancel={onClose} onSave={handleSave} />
    </div>
  )
}

export default AvalancheForm
