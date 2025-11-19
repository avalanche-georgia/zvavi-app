'use client'

import { useTranslations } from 'next-intl'

import { PageWrapper } from '@/UI/containers'

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
