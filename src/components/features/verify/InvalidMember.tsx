'use client'

import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'

const InvalidMember = () => {
  const t = useTranslations()

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="bg-red-500 p-6 text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-red-400 p-3">
            <Icon className="text-white" icon="xMark" size="lg" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">{t('verify.invalid.title')}</h1>
      </div>

      <div className="p-6 text-center">
        <p className="text-gray-600">{t('verify.invalid.description')}</p>
      </div>

      <div className="bg-gray-50 px-6 py-4 text-center">
        <p className="text-xs text-gray-500">{t('verify.card.verifiedBy')}</p>
        <p className="font-medium text-gray-700">Georgian Avalanche Association</p>
      </div>
    </div>
  )
}

export default InvalidMember
