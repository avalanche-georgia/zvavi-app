import { useLocale } from 'next-intl'

// Forecast times are Georgian local times for every reader — and a fixed zone
// renders the same on the server and in the browser
const timeZone = 'Asia/Tbilisi'

// en-GB for day-first dates ("Wed 15 Apr"); other locales as they are
const toIntlLocale = (locale: string) => (locale === 'en' ? 'en-GB' : locale)

const useForecastDates = () => {
  const locale = toIntlLocale(useLocale())

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    timeZone,
    year: 'numeric',
  })
  const dayFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    timeZone,
    weekday: 'short',
  })
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    timeZone,
  })

  const formatTime = (value: Date | string) => timeFormatter.format(new Date(value))

  // Position of a time within its day, 0 (00:00) → 1 (24:00)
  const getDayFraction = (value: Date | string) => {
    const [hours, minutes] = formatTime(value).split(':').map(Number)

    return (hours * 60 + minutes) / (24 * 60)
  }

  return {
    // "15 Apr 2026"
    formatDate: (value: Date | string) => dateFormatter.format(new Date(value)),
    // "Wed 15 Apr"
    formatDay: (value: Date | string) => dayFormatter.format(new Date(value)),
    // "07:37"
    formatTime,
    getDayFraction,
  }
}

export default useForecastDates
