import { useToast } from '@components/hooks'
import { useWeatherStationCreate, useWeatherStationUpdate } from '@data/hooks/weatherStations'
import { useTranslations } from 'next-intl'

import type { WeatherStationFormSchema } from './schema'

type UseWeatherStationFormSubmitParams = {
  onSuccess: VoidFunction
  stationId?: string
}

const useWeatherStationFormSubmit = ({
  onSuccess,
  stationId,
}: UseWeatherStationFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createStation } = useWeatherStationCreate()
  const { mutateAsync: updateStation } = useWeatherStationUpdate()

  const handleSubmit = async (fields: WeatherStationFormSchema) => {
    try {
      if (stationId) {
        await updateStation({ ...fields, id: stationId })
      } else {
        await createStation(fields)
      }

      toastSuccess(t(`admin.weatherStations.form.messages.${stationId ? 'updated' : 'created'}`))
      onSuccess()
    } catch (error) {
      toastError('WeatherStationForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default useWeatherStationFormSubmit
