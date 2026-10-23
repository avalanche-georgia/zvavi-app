type DetailSectionProps = {
  children: React.ReactNode
  title: React.ReactNode
}

const DetailSection = ({ children, title }: DetailSectionProps) => (
  <section className="px-4 pt-5">
    <h3 className="text-muted text-copy-sm tracking-eyebrow mb-2.5 font-semibold uppercase">
      {title}
    </h3>
    {children}
  </section>
)

export default DetailSection
