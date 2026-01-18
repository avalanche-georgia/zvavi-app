import QRCode from 'qrcode'

import { qrCodeConfig } from './config'

import { baseUrl } from '@/routes'

export const getVerificationUrl = (verificationCode: string): string => {
  const url = new URL(`/verify/${verificationCode}`, baseUrl)

  return url.toString()
}

const loadImageAsDataUrl = async (src: string): Promise<string> => {
  const absoluteUrl = new URL(src, window.location.origin).href
  const response = await fetch(absoluteUrl)

  if (!response.ok) {
    throw new Error(`Failed to load image: ${response.status} ${response.statusText}`)
  }

  const blob = await response.blob()

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

const addLogoToQR = async (qrDataUrl: string, logoSrc: string): Promise<string> => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Load QR code
  const qrImage = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load QR code image'))
    img.src = qrDataUrl
  })

  canvas.width = qrImage.width
  canvas.height = qrImage.height
  ctx.drawImage(qrImage, 0, 0)

  // Load and draw logo
  try {
    const logoDataUrl = await loadImageAsDataUrl(logoSrc)
    const logo = await new Promise<HTMLImageElement>((resolve) => {
      const img = new Image()

      img.onload = () => resolve(img)
      img.onerror = () => resolve(img) // Resolve anyway, we'll skip drawing
      img.src = logoDataUrl
    })

    if (logo.complete && logo.naturalWidth > 0) {
      const { padding, sizeRatio } = qrCodeConfig.logo
      const logoSize = qrImage.width * sizeRatio
      const logoX = (qrImage.width - logoSize) / 2
      const logoY = (qrImage.height - logoSize) / 2

      ctx.fillStyle = qrCodeConfig.bgColor
      const p2 = padding * 2

      ctx.fillRect(logoX - padding, logoY - padding, logoSize + p2, logoSize + p2)
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
    }
  } catch {
    // If logo fails to load, return QR without logo
  }

  return canvas.toDataURL('image/png')
}

export const generateQRCodeDataUrl = async (verificationCode: string): Promise<string> => {
  const url = getVerificationUrl(verificationCode)

  const qrDataUrl = await QRCode.toDataURL(url, {
    color: {
      dark: qrCodeConfig.fgColor,
      light: qrCodeConfig.bgColor,
    },
    errorCorrectionLevel: 'H',
    margin: qrCodeConfig.margin,
    width: qrCodeConfig.width,
  })

  return addLogoToQR(qrDataUrl, qrCodeConfig.logo.src)
}

export const downloadQRCode = async (verificationCode: string, fileName: string): Promise<void> => {
  const dataUrl = await generateQRCodeDataUrl(verificationCode)
  const link = document.createElement('a')

  link.download = `${fileName}.png`
  link.href = dataUrl
  document.body.appendChild(link)

  try {
    link.click()
  } finally {
    document.body.removeChild(link)
  }
}
