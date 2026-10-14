import type { DataTableLabels } from '@ds/patterns'
import { useTranslations } from 'next-intl'

// The DataTable's pagination strings, translated
const useDataTableLabels = (): DataTableLabels => {
  const t = useTranslations()

  return {
    loading: t('common.messages.loading'),
    nextPage: t('common.table.nextPage'),
    previousPage: t('common.table.previousPage'),
    rowRange: (range) => t('common.table.rowRange', range),
  }
}

export default useDataTableLabels
