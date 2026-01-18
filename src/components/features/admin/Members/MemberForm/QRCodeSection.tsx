'use client'

import { useCallback } from 'react'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'
import { QRCodeSVG } from 'qrcode.react'
import { useCopyToClipboard } from 'usehooks-ts'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

type QRCodeSectionProps = {
  member: Member
}

const QRCodeSection = ({ member }: QRCodeSectionProps) => {
  const t = useTranslations()
  const verificationUrl = getVerificationUrl(member.verificationCode)
  const [, copyToClipboard] = useCopyToClipboard()

  const handleDownload = useCallback(async () => {
    const fileName = `member-qr-${member.memberId}`

    await downloadQRCode(member.verificationCode, fileName)
  }, [member.memberId, member.verificationCode])

  const handleCopyUrl = useCallback(() => {
    copyToClipboard(verificationUrl)
  }, [copyToClipboard, verificationUrl])

  return (
    <div className="rounded bg-gray-50 p-4">
      <h3 className="mb-4 font-medium">{t('admin.members.qrCode.title')}</h3>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="rounded bg-white p-2 shadow">
          <QRCodeSVG level="H" size={150} value={verificationUrl} />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm text-gray-600">{t('admin.members.qrCode.description')}</p>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-gray-100 px-2 py-1 text-xs">
                {verificationUrl}
              </code>
              <Button onClick={handleCopyUrl} variant="secondary">
                <Icon icon="copy" size="sm" />
              </Button>
            </div>

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
