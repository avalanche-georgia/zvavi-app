type LegalSectionProps = {
  description: string
  title: string
  items?: string[]
}

const LegalSection = ({ description, items, title }: LegalSectionProps) => (
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
  </section>
)

export default LegalSection
