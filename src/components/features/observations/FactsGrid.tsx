export type Fact = { label: string; value: React.ReactNode }

// Two-column grid with hairline dividers. An odd last fact spans the full row,
// so no empty cell is left behind.
const FactsGrid = ({ facts }: { facts: Fact[] }) => (
  <dl className="bg-rule border-rule rounded-media mx-4 mt-3 grid grid-cols-2 gap-px overflow-hidden border">
    {facts.map(({ label, value }) => (
      <div key={label} className="bg-surface px-3 py-2.5 last:odd:col-span-2">
        <dt className="text-caption text-muted">{label}</dt>
        <dd className="text-copy-lg mt-0.5 font-semibold">{value}</dd>
      </div>
    ))}
  </dl>
)

export default FactsGrid
