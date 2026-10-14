import type { AvalancheSource } from '@domain/types'
import { InfoTip, SegmentedControl, Select, Switch } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { AvalanchesListPage } from '../hooks/useAvalanchesListPage'
import { type CatalogStatus, catalogStatuses } from '../model'

type CatalogFiltersProps = {
  page: Pick<
    AvalanchesListPage,
    'isUnlinked' | 'onSourceChange' | 'onStatusChange' | 'onUnlinkedChange' | 'source' | 'status'
  >
}

// "No filter" needs a real value in both controls
const allValue = 'all'

type SourceValue = AvalancheSource | typeof allValue
type StatusValue = CatalogStatus | typeof allValue

const sources = [allValue, 'team', 'external'] as const satisfies readonly SourceValue[]

// Who logged it (team / public report), the publish status and whether a
// forecast links to it — catalog only
const CatalogFilters = ({ page }: CatalogFiltersProps) => {
  const t = useTranslations()

  const sourceOptions = sources.map((value: SourceValue) => ({
    label:
      value === allValue
        ? t('admin.recentAvalanches.filters.all')
        : t(`common.avalancheSources.${value}`),
    value,
  }))

  const statusOptions: { label: string; value: StatusValue }[] = [
    { label: t('admin.recentAvalanches.filters.allStatuses'), value: allValue },
    ...catalogStatuses.map((value) => ({ label: t(`common.avalancheStatuses.${value}`), value })),
  ]

  const handleSourceChange = (value: SourceValue) =>
    page.onSourceChange(value === allValue ? null : value)
  const handleStatusChange = (value: StatusValue) =>
    page.onStatusChange(value === allValue ? null : value)

  return (
    <>
      <SegmentedControl
        ariaLabel={t('admin.recentAvalanches.list.columns.source')}
        className="max-w-full overflow-x-auto"
        onChange={handleSourceChange}
        options={sourceOptions}
        value={page.source ?? allValue}
      />
      {/* No visible label in a toolbar row — the options name themselves */}
      <div aria-label={t('admin.recentAvalanches.list.columns.status')} role="group">
        <Select<StatusValue>
          className="w-44"
          onValueChange={handleStatusChange}
          options={statusOptions}
          value={page.status ?? allValue}
        />
      </div>
      <Switch
        checked={page.isUnlinked}
        label={t('admin.recentAvalanches.filters.unlinked.label')}
        labelAside={
          <InfoTip ariaLabel={t('admin.recentAvalanches.filters.unlinked.about')}>
            {t('admin.recentAvalanches.filters.unlinked.hint')}
          </InfoTip>
        }
        onCheckedChange={page.onUnlinkedChange}
      />
    </>
  )
}

export default CatalogFilters
