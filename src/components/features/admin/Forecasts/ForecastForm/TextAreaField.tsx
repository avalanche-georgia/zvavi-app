import { Textarea } from '@components/ui'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import type { ForecastFormSchema } from './schema'

type TextAreaFieldProps = {
  type: 'additionalHazards' | 'snowpack' | 'summary' | 'weather'
}

const TextAreaField = ({ type }: TextAreaFieldProps) => {
  const t = useTranslations()
  const { register } = useFormContext<ForecastFormSchema>()

  return (
    <div className="flex flex-1 flex-col gap-4 pt-1.5">
      <h4 className="font-semibold">{t(`admin.forecast.form.general.labels.${type}`)}</h4>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Textarea className="w-full" rows={6} {...register(type)} />
    </div>
  )
}

export default TextAreaField
