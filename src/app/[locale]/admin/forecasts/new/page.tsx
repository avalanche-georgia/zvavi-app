'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewForecastPage = () => {
  const router = useRouter()

  const handleCancel = () => {
    router.push(routes.admin.forecasts.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.root)
  }

  return (
    <ForecastForm
      initialFormData={getInitialFormData(null)}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  )
}

export default NewForecastPage
