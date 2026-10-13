'use client'

import { DetailSection } from '@components/features/observations'
import { BrandedQRCode } from '@components/ui'
import type { Member } from '@domain/types'
import { Button } from '@ds/primitives'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

import VerificationLink from './VerificationLink'
import { useMemberActions } from '../../shared'

import { getVerificationUrl } from '@/lib/qrcode'

// The member card's QR code: scanning it opens the public verification page
const QRCodeSection = ({ member }: { member: Member }) => {
  const t = useTranslations()
  const { onQrDownload } = useMemberActions(member)
  const verificationUrl = getVerificationUrl(member.verificationCode)

  return (
    <DetailSection title={t('admin.members.qrCode.title')}>
      <div className="flex flex-col gap-3">
        <p className="text-copy-sm text-muted">{t('admin.members.qrCode.description')}</p>
        <div className="rounded-media border-rule bg-surface self-center border p-3">
          <BrandedQRCode size={200} value={verificationUrl} />
        </div>
        <VerificationLink url={verificationUrl} />
        <Button onClick={onQrDownload} size="sm" variant="secondary">
          <Download aria-hidden className="size-4" />
          {t('admin.members.qrCode.download')}
        </Button>
      </div>
    </DetailSection>
  )
}

export default QRCodeSection
