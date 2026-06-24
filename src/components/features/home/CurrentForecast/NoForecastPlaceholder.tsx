'use client'

import { Snowflake } from 'lucide-react'
import { useTranslations } from 'next-intl'

const NoForecastPlaceholder = () => {
  const t = useTranslations()

  return (
    <div className="pt-3">
      <div className="flex min-h-[217px] flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-100 p-6 shadow-sm">
        <Snowflake className="text-gray-300" size={40} />
        <p className="text-center font-semibold text-gray-500">{t('forecast.noForecast.title')}</p>
        <p className="text-center text-sm text-gray-400">{t('forecast.noForecast.message')}</p>
      </div>
    </div>
  )
}

export default NoForecastPlaceholder
