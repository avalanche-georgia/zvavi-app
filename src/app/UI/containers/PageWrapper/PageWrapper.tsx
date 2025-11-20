import classnames from 'classnames'

type PageWrapperProps = {
  children: React.ReactNode
  isAdmin?: boolean
  title?: string
}

const PageWrapper = ({ children, isAdmin, title }: PageWrapperProps) => (
  <section
    className={classnames(
      'mx-auto px-4 pb-6 pt-3',
      isAdmin ? 'max-w-screen-xl' : 'max-w-screen-md',
    )}
  >
    {title && <h2 className="mb-6 text-center text-3xl font-semibold">{title}</h2>}
    {children}
  </section>
)

export default PageWrapper
