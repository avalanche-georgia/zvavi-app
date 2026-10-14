// URL ↔ list state helpers shared by the admin lists (filters, sort and page in the query string)

export type ListParamEntries = Record<string, string | null>

export const pickAllowed = <TValue extends string>(
  allowed: readonly TValue[],
  value: string | null,
  fallback: TValue,
) => (allowed.includes(value as TValue) ? (value as TValue) : fallback)

// The URL counts pages from 1; anything unreadable is the first page
export const readPageIndex = (value: string | null) =>
  Math.max(1, Math.floor(Number(value)) || 1) - 1

export const writePageIndex = (pageIndex: number) => (pageIndex > 0 ? String(pageIndex + 1) : null)

// Sets each entry, or removes it when null (a default). Other keys in `base` are kept.
export const applyParamEntries = (base: URLSearchParams, entries: ListParamEntries) => {
  const next = new URLSearchParams(base)

  for (const [key, value] of Object.entries(entries)) {
    if (value === null) next.delete(key)
    else next.set(key, value)
  }

  return next.toString()
}
