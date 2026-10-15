type ListSectionProps = {
  // Line before the list
  intro: string
  items: React.ReactNode[]
}

// "We welcome help in:" followed by a bulleted list
const ListSection = ({ intro, items }: ListSectionProps) => (
  <div>
    <p>{intro}</p>
    <ul className="marker:text-muted mt-2 flex list-disc flex-col gap-1 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)

export default ListSection
