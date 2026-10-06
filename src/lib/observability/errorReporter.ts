// Single entry point for client-side error reporting.
// No error-tracking service is connected right now; wire the next one in here.
export const reportError = (error: Error, context?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'production') return

  console.error(error, context)
}
