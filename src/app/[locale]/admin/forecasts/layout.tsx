'use client'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  return <div className="mx-auto max-w-(--breakpoint-xl) p-4 md:p-6">{children}</div>
}

export default Layout
