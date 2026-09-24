import { useFormatter } from 'next-intl'

// "23 Sept 2026", localized
const useFormatDay = () => {
  const format = useFormatter()

  return (date: Date | string) =>
    format.dateTime(new Date(date), { day: '2-digit', month: 'short', year: 'numeric' })
}

export default useFormatDay
