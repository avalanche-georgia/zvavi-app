// A write RLS refused (or a row that no longer exists): Supabase returns no error, just no rows
export class ForecastWriteDeniedError extends Error {
  constructor() {
    super('Forecast write was not applied')
    this.name = 'ForecastWriteDeniedError'
  }
}

// The DB refused to publish: valid_until is missing or not in the future
// (handle_published_at raises check_violation)
export class ForecastPublishRejectedError extends Error {
  constructor() {
    super('Forecast publish was rejected')
    this.name = 'ForecastPublishRejectedError'
  }
}
