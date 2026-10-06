type LegalSectionProps = {
  description: string
  // A closing paragraph after the list
  details?: string
  items?: string[]
  title: string
}

const LegalSection = ({ description, details, items, title }: LegalSectionProps) => (
  <section className="space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p>{description}</p>
    {items && items.length > 0 && (
      <ul className="list-inside list-disc space-y-1 pl-2">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
    {details && <p>{details}</p>}
  </section>
)

export default LegalSection
