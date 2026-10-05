// A forecast (or its region) that can't be published safely. The bulletin is
// omitted and logged — never repaired. Messages carry field names only, never
// user data, so they are safe to log.
export class InvalidForecastError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidForecastError'
  }
}
