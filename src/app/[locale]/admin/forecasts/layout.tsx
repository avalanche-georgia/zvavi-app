'use client'

import { PageWrapper } from '@components/layout'
import { useTranslations } from 'next-intl'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const t = useTranslations()

  return (
    <PageWrapper isAdmin title={t('admin.forecasts.title')}>
      {children}
    </PageWrapper>
  )
}

export default Layout
