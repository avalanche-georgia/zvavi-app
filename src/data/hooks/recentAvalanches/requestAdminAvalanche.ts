// `id`: the new record's, on create
type AdminAvalancheResponse = { error?: string; id?: number; ok: boolean }

// Admin record writes go through server routes (photos need the R2
// credentials). Throws the route's error message, e.g. photosNotFoundError, so
// callers can show a specific message.
const requestAdminAvalanche = async (
  url: string,
  method: 'PATCH' | 'POST',
  body: unknown,
): Promise<AdminAvalancheResponse> => {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method,
  })
  const result = (await response.json()) as AdminAvalancheResponse

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to save avalanche')

  return result
}

export default requestAdminAvalanche
