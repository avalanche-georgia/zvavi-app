// A write RLS refused (or a row that no longer exists): Supabase returns no error, just no rows
export class ForecastWriteDeniedError extends Error {
  constructor() {
    super('Forecast write was not applied')
    this.name = 'ForecastWriteDeniedError'
  }
}
