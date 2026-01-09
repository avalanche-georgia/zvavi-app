'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewForecastPage = () => {
  const t = useTranslations()
  const router = useRouter()

  const handleCancel = () => {
    router.push(routes.admin.forecasts.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.root)
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b p-4 md:px-6">
        <h2 className="text-xl font-semibold">{t('admin.forecast.title.create')}</h2>
      </div>
      <ForecastForm
        initialFormData={getInitialFormData(null)}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default NewForecastPage
