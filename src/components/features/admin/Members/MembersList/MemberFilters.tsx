import { Icon } from '@components/icons'
import { Select, toOptions } from '@components/ui'
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
    <div className="mb-4 flex gap-4">
      <div className="relative flex-1">
        <Icon
          className="text-gray-400"
          containerClassName="absolute left-3 top-1/2 -translate-y-1/2"
          icon="search"
          size="sm"
        />
        <input
          className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('admin.members.filters.searchPlaceholder')}
          type="text"
          value={search}
        />
      </div>

      <Select
        className="w-48"
        onChange={(value) => onStatusChange(value === 'all' ? '' : (value as MemberStatus))}
        options={statusOptions}
        value={statusFilter || 'all'}
      />
    </div>
  )
}

export default MemberFilters
