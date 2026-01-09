'use client'

import { useTranslations } from 'next-intl'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const t = useTranslations()

  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="mb-6 text-2xl font-semibold">{t('admin.forecasts.title')}</h1>
      {children}
    </div>
  )
}

export default Layout
