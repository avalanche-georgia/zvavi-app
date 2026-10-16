import { useTeamProfilesQuery } from '@data/hooks/userProfiles'
import type { SelectOption } from '@ds/primitives'
import { useTranslations } from 'next-intl'

export const otherForecasterValue = 'other'

// The forecaster the form was loaded or last saved with
type UseForecasterOptionsParams = {
  savedForecaster: string
  savedForecasterId: string | null
}

// Staff A–Z (nameless profiles left out), the saved forecaster when they aren't
// among them, then "Other person". A failed team list leaves just the latter
// two — it never blocks saving.
const useForecasterOptions = ({
  savedForecaster,
  savedForecasterId,
}: UseForecasterOptionsParams) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.general'
  const { data: profiles = [], isLoading, isSuccess } = useTeamProfilesQuery()

  const staffOptions = profiles
    .filter((profile) => profile.fullName)
    .map((profile) => ({ label: profile.fullName, value: profile.id }))
    .sort((first, second) => first.label.localeCompare(second.label))

  // Not in the list: still loading, failed, or they've left the team. Kept as an
  // option by the saved name — the select never shows the raw id, and switching
  // to "Other person" and back doesn't lose the link.
  const isSavedUnlisted =
    savedForecasterId !== null && !staffOptions.some(({ value }) => value === savedForecasterId)
  // Only a loaded list can tell they've left the team
  const unlistedLabel = isSuccess
    ? t(`${key}.formerStaff`, { name: savedForecaster })
    : savedForecaster

  const options: SelectOption<string>[] = [
    ...staffOptions,
    ...(isSavedUnlisted ? [{ label: unlistedLabel, value: savedForecasterId }] : []),
    { label: t(`${key}.otherForecaster`), value: otherForecasterValue },
  ]

  // The name saved with a picked profile
  const getName = (profileId: string) =>
    staffOptions.find(({ value }) => value === profileId)?.label ?? savedForecaster

  return { getName, isLoading, options }
}

export default useForecasterOptions
