'use client'

import { useTranslations } from 'next-intl'

const AdminPage = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-gray-600">{t('admin.selectSection')}</p>
    </div>
  )
}

export default AdminPage
