export type Fact = { label: string; value: React.ReactNode }

// Two-column grid with hairline dividers
const FactsGrid = ({ facts }: { facts: Fact[] }) => (
  <dl className="bg-rule border-rule mx-4 mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border">
    {facts.map(({ label, value }) => (
      <div key={label} className="bg-white px-3 py-2.5">
        <dt className="text-muted text-xs">{label}</dt>
        <dd className="mt-0.5 text-[15px] font-semibold">{value}</dd>
      </div>
    ))}
  </dl>
)

export default FactsGrid
