// The time field's text as it's typed, with the colon put in as soon as the hour
// is complete, so "1234" reads "12:34" before it's applied. A first digit of 3–9
// (or 2 followed by 4–9) is a one-digit hour: "930" → "9:30", "25" → "2:5".
// A colon the user typed is kept; deleting (`previous` was longer) never puts
// one back.
export const formatTimeInput = (text: string, previous: string) => {
  if (text.includes(':')) {
    const [hours, minutes = ''] = text.split(':')

    return `${hours.replace(/\D/g, '').slice(0, 2)}:${minutes.replace(/\D/g, '').slice(0, 2)}`
  }

  const digits = text.replace(/\D/g, '').slice(0, 4)
  const isOneDigitHour = digits[0] > '2' || (digits[0] === '2' && digits[1] > '3')
  const hoursLength = isOneDigitHour ? 1 : 2

  if (digits.length < hoursLength) return digits
  if (digits.length === hoursLength) return text.length > previous.length ? `${digits}:` : digits

  return `${digits.slice(0, hoursLength)}:${digits.slice(hoursLength, hoursLength + 2)}`
}
