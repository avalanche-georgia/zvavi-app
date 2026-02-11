'use client'

import { useCallback } from 'react'
import { Icon } from '@components/icons'
import { CopyInput } from '@components/shared'
import { BrandedQRCode, Button } from '@components/ui'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

type QRCodeSectionProps = {
  member: Member
}

const QRCodeSection = ({ member }: QRCodeSectionProps) => {
  const t = useTranslations()
  const verificationUrl = getVerificationUrl(member.verificationCode)

  const handleDownload = useCallback(async () => {
    const fileName = `member-qr-${member.memberId}`

    await downloadQRCode(member.verificationCode, fileName)
  }, [member.memberId, member.verificationCode])

  return (
    <div className="rounded bg-gray-50 p-4">
      <h3 className="mb-4 font-medium">{t('admin.members.qrCode.title')}</h3>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="rounded bg-white p-2 shadow">
          <BrandedQRCode size={250} value={verificationUrl} />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm text-gray-600">{t('admin.members.qrCode.description')}</p>

          <div className="mt-2 flex flex-col gap-2">
            <CopyInput value={verificationUrl} />

            <Button onClick={handleDownload} variant="secondary">
              <Icon icon="download" size="sm" />
              {t('admin.members.qrCode.download')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeSection
