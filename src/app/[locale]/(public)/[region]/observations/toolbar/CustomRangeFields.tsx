import { useDatePickerText } from '@components/hooks'
import { DatePicker, Field } from '@ds/primitives'
import { format, parseISO } from 'date-fns'
import { useTranslations } from 'next-intl'

type CustomRangeFieldsProps = {
  from: string | null
  onChange: (range: { from: string | null; to: string | null }) => void
  to: string | null
}

const dayFormat = 'yyyy-MM-dd'

const toDate = (day: string | null) => (day ? parseISO(day) : null)
const toDay = (date: Date | null) => (date ? format(date, dayFormat) : null)

// From / To pickers for the "Custom" period; each end is optional and clearable
const CustomRangeFields = ({ from, onChange, to }: CustomRangeFieldsProps) => {
  const t = useTranslations()
  const { calendarLabel, clearLabel, locale } = useDatePickerText()
  const today = format(new Date(), dayFormat)

  const handleFromChange = (date: Date | null) => onChange({ from: toDay(date), to })
  const handleToChange = (date: Date | null) => onChange({ from, to: toDay(date) })

  return (
    <div className="grid grid-cols-2 gap-2">
      <Field label={t('common.words.from')}>
        <DatePicker
          calendarLabel={calendarLabel}
          clearLabel={clearLabel}
          locale={locale}
          max={to ?? today}
          onValueChange={handleFromChange}
          placeholder={t('observations.filters.anyDate')}
          size="sm"
          value={toDate(from)}
        />
      </Field>
      <Field label={t('common.words.to')}>
        <DatePicker
          calendarLabel={calendarLabel}
          clearLabel={clearLabel}
          locale={locale}
          max={today}
          min={from ?? undefined}
          onValueChange={handleToChange}
          placeholder={t('observations.filters.anyDate')}
          size="sm"
          value={toDate(to)}
        />
      </Field>
    </div>
  )
}

export default CustomRangeFields
