import { useTeamProfilesQuery } from '@data/hooks/userProfiles'
import type { SelectOption } from '@ds/primitives'
import { useTranslations } from 'next-intl'

export const otherForecasterValue = 'other'

type UseForecasterOptionsParams = {
  forecaster: string
  forecasterId: string | null
}

// Staff A–Z (nameless profiles left out), the saved forecaster when they're no
// longer staff, then "Other person". A failed team list leaves just the latter
// two — it never blocks saving.
const useForecasterOptions = ({ forecaster, forecasterId }: UseForecasterOptionsParams) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.general'
  const { data: profiles = [], isLoading, isSuccess } = useTeamProfilesQuery()

  const staffOptions = profiles
    .filter((profile) => profile.fullName)
    .map((profile) => ({ label: profile.fullName, value: profile.id }))
    .sort((first, second) => first.label.localeCompare(second.label))

  const isUnlisted =
    !isLoading && forecasterId !== null && !staffOptions.some(({ value }) => value === forecasterId)
  // Only a loaded list can tell they've left the team
  const unlistedLabel = isSuccess ? t(`${key}.formerStaff`, { name: forecaster }) : forecaster

  const options: SelectOption<string>[] = [
    ...staffOptions,
    ...(isUnlisted ? [{ label: unlistedLabel, value: forecasterId }] : []),
    { label: t(`${key}.otherForecaster`), value: otherForecasterValue },
  ]

  // The name saved with a picked profile
  const getName = (profileId: string) =>
    staffOptions.find(({ value }) => value === profileId)?.label ?? forecaster

  return { getName, isLoading, options }
}

export default useForecasterOptions
