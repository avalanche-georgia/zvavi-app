import { useCurrentUserProfileQuery, useTeamProfilesQuery } from '@data/hooks/userProfiles'
import type { SelectOption } from '@ds/primitives'
import { useLocale, useTranslations } from 'next-intl'

export const otherForecasterValue = 'other'

// The forecaster the form was loaded or last saved with
type UseForecasterOptionsParams = {
  savedForecaster: string
  savedForecasterId: string | null
}

// Forecasters A–Z (admins too, for an admin; nameless profiles left out), the
// saved forecaster when they aren't among them, then "Other person". A failed
// list leaves just the latter two — it never blocks saving.
const useForecasterOptions = ({
  savedForecaster,
  savedForecasterId,
}: UseForecasterOptionsParams) => {
  const t = useTranslations()
  const locale = useLocale()
  const key = 'admin.forecast.editor.general'
  const { data: profiles = [], isLoading } = useTeamProfilesQuery()
  const { data: currentProfile } = useCurrentUserProfileQuery()
  // Admin accounts are for development — forecasters don't need them in the list
  const isAdmin = currentProfile?.role === 'admin'

  const choiceOptions = profiles
    .filter(({ fullName, role }) => fullName && (isAdmin || role === 'forecaster'))
    .map((profile) => ({ label: profile.fullName, value: profile.id }))
    .sort((first, second) => first.label.localeCompare(second.label, locale))

  // Not in the list: still loading, failed, an admin (hidden from forecasters)
  // or no longer staff. Kept as an option by the saved name — the select never
  // shows the raw id, and switching to "Other person" and back keeps the link.
  const isSavedUnlisted =
    savedForecasterId !== null && !choiceOptions.some(({ value }) => value === savedForecasterId)

  const options: SelectOption<string>[] = [
    ...choiceOptions,
    ...(isSavedUnlisted ? [{ label: savedForecaster, value: savedForecasterId }] : []),
    { label: t(`${key}.otherForecaster`), value: otherForecasterValue },
  ]

  // The name saved with a picked profile
  const getName = (profileId: string) =>
    choiceOptions.find(({ value }) => value === profileId)?.label ?? savedForecaster

  return { getName, isLoading, options }
}

export default useForecasterOptions
