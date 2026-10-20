// Calendar days travel through the URL as yyyy-MM-dd

const isoDayPattern = /^\d{4}-\d{2}-\d{2}$/

// A URL value → the day, or null when it isn't one
export const readIsoDay = (value: string | null) =>
  value && isoDayPattern.test(value) ? value : null
