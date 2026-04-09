type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  return <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
}

export default Layout
