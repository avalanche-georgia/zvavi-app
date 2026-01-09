'use client'

import { useTranslations } from 'next-intl'

const AdminPage = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-2xl font-semibold">{t('admin.title')}</h1>
      <p className="mt-2 text-gray-600">Select a section from the sidebar to get started.</p>
    </div>
  )
}

export default AdminPage
