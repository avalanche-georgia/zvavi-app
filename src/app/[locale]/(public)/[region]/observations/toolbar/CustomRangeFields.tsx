import { useDateRangePickerText } from '@components/hooks'
import { DateRangePicker, type DayRange } from '@ds/primitives'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type CustomRangeFieldsProps = DayRange & {
  onChange: (range: DayRange) => void
}

// The "Custom" period: one range picker; either end may stay open
const CustomRangeFields = ({ from, onChange, to }: CustomRangeFieldsProps) => {
  const t = useTranslations()
  const { calendarLabel, clearLabel, doneLabel, fromLabel, locale, toLabel } =
    useDateRangePickerText()

  return (
    <DateRangePicker
      ariaLabel={t('common.dateRangePicker.label')}
      calendarLabel={calendarLabel}
      clearLabel={clearLabel}
      doneLabel={doneLabel}
      fromLabel={fromLabel}
      isActive={!!(from || to)}
      locale={locale}
      max={format(new Date(), 'yyyy-MM-dd')}
      onValueChange={onChange}
      placeholder={t('observations.filters.anyDate')}
      size="sm"
      toLabel={toLabel}
      value={{ from, to }}
    />
  )
}

export default CustomRangeFields
