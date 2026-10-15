type HomeSectionProps = {
  children: React.ReactNode
  // id of the section's heading — names the region for screen readers
  labelledBy?: string
}

// Full-width band below the hero: a rule on top, the page container inside
const HomeSection = ({ children, labelledBy }: HomeSectionProps) => (
  <section aria-labelledby={labelledBy} className="border-rule border-t py-8 lg:py-10">
    <div className="mx-auto max-w-310 px-4 md:px-5 xl:px-8">{children}</div>
  </section>
)

export default HomeSection
