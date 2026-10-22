type PageSectionProps = {
  children: React.ReactNode
  title: string
}

const PageSection = ({ children, title }: PageSectionProps) => (
  <section>
    <h2 className="text-title mb-2 font-semibold">{title}</h2>
    {children}
  </section>
)

export default PageSection
