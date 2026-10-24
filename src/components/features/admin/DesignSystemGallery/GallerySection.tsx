type GallerySectionProps = {
  children: React.ReactNode
  id: string
  title: string
}

const GallerySection = ({ children, id, title }: GallerySectionProps) => (
  <section className="border-rule bg-surface rounded-card scroll-mt-4 border p-4 md:p-6" id={id}>
    <h3 className="text-heading text-ink mb-4 font-bold">{title}</h3>
    {children}
  </section>
)

export default GallerySection
