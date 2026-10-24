import { cn } from '@/lib/utils'

type PageWrapperProps = {
  children: React.ReactNode
  isAdmin?: boolean
  title?: string
}

const PageWrapper = ({ children, isAdmin, title }: PageWrapperProps) => (
  <section
    className={cn(
      'mx-auto px-4 pt-3 pb-6',
      isAdmin ? 'max-w-(--breakpoint-xl)' : 'max-w-(--breakpoint-md)',
    )}
  >
    {title && <h1 className="text-title-sm mb-4 text-center font-semibold">{title}</h1>}
    {children}
  </section>
)

export default PageWrapper
