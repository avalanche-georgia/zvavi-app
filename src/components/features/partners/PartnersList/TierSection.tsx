// One tier (or the closing call to action) — no heading; tiers differ by card size
const TierSection = ({ children }: { children: React.ReactNode }) => (
  <section className="border-rule border-t py-6.5 sm:py-8">{children}</section>
)

export default TierSection
