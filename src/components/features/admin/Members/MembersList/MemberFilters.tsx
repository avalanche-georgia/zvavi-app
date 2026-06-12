import { SearchInput, Select, toOptions } from '@components/ui'
import { memberStatuses } from '@domain/constants'
import type { MemberStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

type MemberFiltersProps = {
  onSearchChange: (value: string) => void
  onStatusChange: (value: MemberStatus | '') => void
  search: string
  statusFilter: MemberStatus | ''
}

const MemberFilters = ({
  onSearchChange,
  onStatusChange,
  search,
  statusFilter,
}: MemberFiltersProps) => {
  const t = useTranslations()

  const statusOptions = [
    { label: t('admin.members.filters.allStatuses'), value: 'all' },
    ...toOptions(memberStatuses, (key) => t(`admin.members.statuses.${key}`)),
  ]

  return (
    <div className="flex gap-3">
      <SearchInput
        className="w-64"
        onChange={onSearchChange}
        placeholder={t('admin.members.filters.searchPlaceholder')}
        value={search}
      />
      <Select
        className="w-44"
        onChange={(value) => onStatusChange(value === 'all' ? '' : (value as MemberStatus))}
        options={statusOptions}
        value={statusFilter || 'all'}
      />
    </div>
  )
}

export default MemberFilters
