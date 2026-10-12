// PostgREST code for `.single()` finding no row: an expected "not found", not a failure
const isNoRowsError = (error: { code?: string } | null) => error?.code === 'PGRST116'

export default isNoRowsError
