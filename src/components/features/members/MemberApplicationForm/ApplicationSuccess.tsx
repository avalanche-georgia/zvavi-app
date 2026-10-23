'use client'

import { links } from '@components/constants'
import { BrandedQRCode, CopyField, CopyFieldGroup } from '@components/shared'
import { SuccessState } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { SubmitResult } from './submitApplication'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

const emailLink = (chunks: React.ReactNode) => (
  <a
    className="focus-ring text-accent hover:text-accent-hover rounded-badge underline underline-offset-2"
    href={`mailto:${links.email}`}
  >
    {chunks}
  </a>
)

// The member's verification QR code and link: their status page once approved
const ApplicationSuccess = ({ memberId, verificationCode }: SubmitResult) => {
  const t = useTranslations()
  const verificationUrl = getVerificationUrl(verificationCode)

  const handleDownload = () => downloadQRCode(verificationCode, `member-qr-${memberId}`)

  return (
    <SuccessState
      description={t('joinUs.apply.success.description')}
      title={t('joinUs.apply.success.title')}
    >
      <div className="mt-3 flex w-full max-w-sm flex-col items-center gap-4">
        <div className="rounded-media border-rule border p-3">
          <BrandedQRCode size={200} value={verificationUrl} />
        </div>
        <p className="text-copy-sm text-muted text-pretty">{t('joinUs.apply.success.qrHint')}</p>
        <Button onClick={handleDownload} variant="secondary">
          <Download aria-hidden className="size-4" />
          {t('joinUs.apply.success.downloadQR')}
        </Button>
        <div className="w-full text-left">
          <CopyFieldGroup>
            <CopyField label={t('joinUs.apply.success.verificationLink')} value={verificationUrl} />
          </CopyFieldGroup>
        </div>
        <p className="text-copy-sm text-muted">
          {t.rich('joinUs.apply.success.contact', { email: links.email, link: emailLink })}
        </p>
      </div>
    </SuccessState>
  )
}

export default ApplicationSuccess
