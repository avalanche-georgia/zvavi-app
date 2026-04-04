import clsx from 'clsx'

type PageWrapperProps = {
  children: React.ReactNode
  isAdmin?: boolean
  title?: string
}

const PageWrapper = ({ children, isAdmin, title }: PageWrapperProps) => (
  <section
    className={clsx(
      'mx-auto px-4 pt-3 pb-6',
      isAdmin ? 'max-w-(--breakpoint-xl)' : 'max-w-(--breakpoint-md)',
    )}
  >
    {title && <h2 className="mb-6 text-center text-3xl font-semibold">{title}</h2>}
    {children}
  </section>
)

export default PageWrapper
