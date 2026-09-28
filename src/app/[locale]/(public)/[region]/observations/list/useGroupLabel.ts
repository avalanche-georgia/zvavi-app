import { parseISO } from 'date-fns'
import { useFormatter, useTranslations } from 'next-intl'

import type { ObservationGroupKey } from '../helpers/groupObservations'

// Today / Yesterday / This week / "September 2026" / Date unknown
const useGroupLabel = () => {
  const t = useTranslations()
  const format = useFormatter()

  return (key: ObservationGroupKey): string => {
    if (key.startsWith('month:')) {
      return format.dateTime(parseISO(`${key.slice('month:'.length)}-01`), {
        month: 'long',
        year: 'numeric',
      })
    }

    return t(`observations.groups.${key}`)
  }
}

export default useGroupLabel
