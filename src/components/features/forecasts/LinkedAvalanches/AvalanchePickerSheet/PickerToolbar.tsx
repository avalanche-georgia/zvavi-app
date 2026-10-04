import { Badge, ChipGroup, TextField } from '@ds/primitives'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { PickerPeriod } from './usePickerFilters'

type PickerToolbarProps = {
  onPeriodChange: (period: PickerPeriod) => void
  onQueryChange: (query: string) => void
  period: PickerPeriod
  query: string
}

const PickerToolbar = ({ onPeriodChange, onQueryChange, period, query }: PickerToolbarProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.avalanches.picker'

  const options = [
    { label: t(`${key}.periods.all`), value: 'all' as const },
    { label: t(`${key}.periods.last7`), value: 'last7' as const },
    { label: t(`${key}.periods.last30`), value: 'last30' as const },
    {
      // Reserved slot for a future quick filter
      ariaLabel: t(`${key}.mineNotLinked`),
      disabled: true,
      label: (
        <span className="flex items-center gap-1.5">
          {t(`${key}.mineNotLinked`)}
          <Badge>{t(`${key}.soon`)}</Badge>
        </span>
      ),
      value: 'mine' as const,
    },
  ]

  return (
    <div className="flex flex-col gap-3 px-4 pt-3">
      <div className="relative">
        <Search aria-hidden className="text-muted absolute top-3.5 left-3 z-10 size-4" />
        <TextField
          aria-label={t(`${key}.searchLabel`)}
          className="[&_input]:pl-9"
          onValueChange={onQueryChange}
          placeholder={t(`${key}.searchPlaceholder`)}
          type="search"
          value={query}
        />
      </div>
      <ChipGroup
        ariaLabel={t(`${key}.periodLabel`)}
        onChange={(value) => value && value !== 'mine' && onPeriodChange(value)}
        options={options}
        value={period}
      />
    </div>
  )
}

export default PickerToolbar
