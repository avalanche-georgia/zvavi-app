type DetailSectionProps = {
  children: React.ReactNode
  title: string
}

const DetailSection = ({ children, title }: DetailSectionProps) => (
  <section className="px-4 pt-5">
    <h3 className="text-muted mb-2.5 text-[13px] font-semibold tracking-[.05em] uppercase">
      {title}
    </h3>
    {children}
  </section>
)

export default DetailSection
