import type { Forecast } from '@domain/types'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ProseText from './ProseText'

type ConditionsForecast = Pick<Forecast, 'additionalHazards' | 'snowpack' | 'weather'>

const fields = ['snowpack', 'weather', 'additionalHazards'] as const

const ConditionsCard = ({ forecast }: { forecast: ConditionsForecast }) => {
  const t = useTranslations()

  return (
    <FormCard title={t('admin.forecast.editor.conditions.title')}>
      <div className="@container">
        <dl className="grid grid-cols-2 gap-x-7 gap-y-5 @max-[620px]:grid-cols-1">
          {fields.map((field) => (
            <div
              key={field}
              className={field === 'additionalHazards' ? 'col-span-full' : undefined}
            >
              <dt className="text-muted text-copy-sm mb-1 font-semibold uppercase">
                {t(`admin.forecast.form.general.labels.${field}`)}
              </dt>
              <dd>
                <ProseText
                  className="text-copy"
                  placeholder={t('admin.forecasts.view.notWritten')}
                  text={forecast[field]}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </FormCard>
  )
}

export default ConditionsCard
