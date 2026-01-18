import QRCode from 'qrcode'

import { qrCodeConfig } from './config'

import { baseUrl } from '@/routes'

export const getVerificationUrl = (verificationCode: string): string => {
  return `${baseUrl}/verify/${verificationCode}`
}

const addLogoToQR = (qrDataUrl: string, logoSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Could not get canvas context'))

      return
    }

    const qrImage = new Image()

    qrImage.onload = () => {
      canvas.width = qrImage.width
      canvas.height = qrImage.height

      ctx.drawImage(qrImage, 0, 0)

      const logo = new Image()

      logo.onload = () => {
        const { padding, sizeRatio } = qrCodeConfig.logo
        const logoSize = qrImage.width * sizeRatio
        const logoX = (qrImage.width - logoSize) / 2
        const logoY = (qrImage.height - logoSize) / 2

        ctx.fillStyle = qrCodeConfig.bgColor
        ctx.fillRect(
          logoX - padding,
          logoY - padding,
          logoSize + padding * 2,
          logoSize + padding * 2,
        )

        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)

        resolve(canvas.toDataURL('image/png'))
      }

      logo.onerror = () => {
        resolve(qrDataUrl)
      }

      logo.src = logoSrc
    }

    qrImage.onerror = () => {
      reject(new Error('Could not load QR code image'))
    }

    qrImage.src = qrDataUrl
  })
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
  link.click()
  document.body.removeChild(link)
}
