type PageWrapperProps = {
  children: React.ReactNode
  title?: string
}

const PageWrapper = ({ children, title }: PageWrapperProps) => (
  <section className="mx-auto max-w-screen-md px-4 pb-6 pt-3">
    {title && <h2 className="mb-6 text-center text-3xl font-semibold">{title}</h2>}
    {children}
  </section>
)

export default PageWrapper
