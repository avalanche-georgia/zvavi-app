import { DatePicker } from '@components/ui'
import { format, parseISO } from 'date-fns'
import { useTranslations } from 'next-intl'

type CustomRangeFieldsProps = {
  from: string | null
  onChange: (range: { from: string | null; to: string | null }) => void
  to: string | null
}

const toDate = (day: string | null) => (day ? parseISO(day) : null)
const toDay = (date: Date | null) => (date ? format(date, 'yyyy-MM-dd') : null)

const CustomRangeFields = ({ from, onChange, to }: CustomRangeFieldsProps) => {
  const t = useTranslations()
  const today = new Date()
  const fromDate = toDate(from)
  const toDateValue = toDate(to)

  const handleFromChange = (date: Date | null) => onChange({ from: toDay(date), to })
  const handleToChange = (date: Date | null) => onChange({ from, to: toDay(date) })

  return (
    <div className="grid grid-cols-2 gap-2">
      <label className="text-muted flex flex-col gap-1 text-xs">
        {t('common.words.from')}
        <DatePicker
          className="border-rule h-10.5 w-full rounded-[10px] border bg-white"
          isClearable
          maxDate={toDateValue ?? today}
          onChange={handleFromChange}
          placeholder={t('observations.filters.anyDate')}
          value={fromDate}
        />
      </label>
      <label className="text-muted flex flex-col gap-1 text-xs">
        {t('common.words.to')}
        <DatePicker
          className="border-rule h-10.5 w-full rounded-[10px] border bg-white"
          isClearable
          maxDate={today}
          minDate={fromDate ?? undefined}
          onChange={handleToChange}
          placeholder={t('observations.filters.anyDate')}
          value={toDateValue}
        />
      </label>
    </div>
  )
}

export default CustomRangeFields
