'use client'

import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'

const InvalidMember = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card bg-surface shadow-menu w-full max-w-md overflow-hidden">
      <div className="bg-danger p-6 text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-white/20 p-3">
            <Icon className="text-white" icon="xMark" size="lg" />
          </div>
        </div>
        <h1 className="text-title font-bold text-white">{t('verify.invalid.title')}</h1>
      </div>

      <div className="p-6 text-center">
        <p className="text-body">{t('verify.invalid.description')}</p>
      </div>

      <div className="bg-canvas px-6 py-4 text-center">
        <p className="text-caption text-muted">{t('verify.card.verifiedBy.label')}</p>
        <p className="text-body font-medium">{t('verify.card.verifiedBy.value')}</p>
      </div>
    </div>
  )
}

export default InvalidMember
