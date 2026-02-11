'use client'

import { useCallback } from 'react'
import { links } from '@components/constants'
import { Icon } from '@components/icons'
import { CopyInput } from '@components/shared'
import { BrandedQRCode, Button } from '@components/ui'
import { useTranslations } from 'next-intl'

import type { SubmitResult } from './submitApplication'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

const ApplicationSuccess = ({ memberId, verificationCode }: SubmitResult) => {
  const t = useTranslations()
  const verificationUrl = getVerificationUrl(verificationCode)

  const handleDownload = useCallback(async () => {
    await downloadQRCode(verificationCode, `member-qr-${memberId}`)
  }, [memberId, verificationCode])

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-12 items-center justify-center rounded-full bg-green-100">
          <Icon className="text-green-600" icon="check" size="md" />
        </div>
        <h2 className="text-lg font-semibold">{t('joinUs.apply.success.title')}</h2>
        <p className="max-w-md text-sm text-gray-600">{t('joinUs.apply.success.description')}</p>
      </div>

      <div className="flex rounded-lg border bg-white p-4 shadow">
        <BrandedQRCode size={200} value={verificationUrl} />
      </div>

      <p className="max-w-md text-xs text-gray-500">{t('joinUs.apply.success.qrHint')}</p>

      <Button onClick={handleDownload}>
        <Icon icon="download" size="sm" />
        {t('joinUs.apply.success.downloadQR')}
      </Button>

      <div className="w-full max-w-md">
        <CopyInput value={verificationUrl} />
      </div>

      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="mb-1 text-sm font-medium">{t('joinUs.apply.success.contactTitle')}</p>
        <a className="text-sm text-primary underline" href={`mailto:${links.email}`}>
          {links.email}
        </a>
      </div>
    </div>
  )
}

export default ApplicationSuccess
