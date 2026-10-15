// Tag renderers for t.rich() — React elements instead of HTML strings. Module-level so
// they aren't recreated (or flagged as nested components) on every render.
export const richBold = (chunks: React.ReactNode) => (
  <b className="text-ink font-semibold">{chunks}</b>
)
