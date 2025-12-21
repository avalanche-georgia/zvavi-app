type PageSectionProps = {
  children: React.ReactNode
  title: string
}

const PageSection = ({ children, title }: PageSectionProps) => (
  <section>
    <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
    {children}
  </section>
)

export default PageSection
