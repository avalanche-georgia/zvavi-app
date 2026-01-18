'use client'

import logo from '@assets/images/logo.png'
import Image from 'next/image'
import { QRCodeCanvas } from 'qrcode.react'

import { qrCodeConfig } from '@/lib/qrcode'

type BrandedQRCodeProps = {
  size: number
  value: string
}

const BrandedQRCode = ({ size, value }: BrandedQRCodeProps) => {
  const logoSize = Math.round(size * qrCodeConfig.logo.sizeRatio)

  return (
    <div className="relative inline-block">
      <QRCodeCanvas
        bgColor={qrCodeConfig.bgColor}
        fgColor={qrCodeConfig.fgColor}
        level="H"
        marginSize={1}
        size={size}
        value={value}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white p-1"
        style={{ height: logoSize, width: logoSize }}
      >
        <Image
          alt="Avalanche Georgia logo embedded in QR code"
          className="size-full object-contain"
          height={logoSize}
          src={logo}
          width={logoSize}
        />
      </div>
    </div>
  )
}

export default BrandedQRCode
