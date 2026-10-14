import { cn } from '@/lib/utils'

type AdminPageBodyProps = {
  children: React.ReactNode
  className?: string
}

// The page column of an admin list screen. @container: content responds to its own
// width — the sidebar eats viewport space, so viewport breakpoints would lie.
const AdminPageBody = ({ children, className }: AdminPageBodyProps) => (
  <div
    className={cn(
      '@container mx-auto flex w-full max-w-360 flex-col gap-4 px-3 py-4 md:px-8 md:pt-6 md:pb-10',
      className,
    )}
  >
    {children}
  </div>
)

export default AdminPageBody
