import { useToast } from '@components/hooks'
import type { RegionId } from '@domain/types'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import type { ForecastSavedEvent } from './useForecastFormSave'

import { routes } from '@/routes'

// After a save: Save & close goes back to the list; Save stays. The first save
// of a new forecast swaps /new for its edit URL, so a refresh can't create a
// duplicate — without remounting the form.
const useForecastSavedNavigation = (regionId: RegionId) => {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const { toastSuccess } = useToast()
  const key = 'admin.forecast.editor.save'

  return ({ andClose, forecastId, isCreated }: ForecastSavedEvent) => {
    if (andClose) {
      toastSuccess(t(isCreated ? `${key}.created` : `${key}.updated`))
      router.push(routes.admin.forecasts.listByRegion(regionId))

      return
    }

    toastSuccess(t(isCreated ? `${key}.createdKeepEditing` : `${key}.saved`))

    if (isCreated) {
      // Keeps ?regionId — without it the edit page redirects to the list
      window.history.replaceState(
        null,
        '',
        `/${locale}${routes.admin.forecasts.editInRegion(forecastId, regionId)}`,
      )
    }
  }
}

export default useForecastSavedNavigation
