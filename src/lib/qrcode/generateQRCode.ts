import QRCode from 'qrcode'

import { baseUrl } from '@/routes'

export const getVerificationUrl = (verificationCode: string): string => {
  return `${baseUrl}/verify/${verificationCode}`
}

export const generateQRCodeDataUrl = async (verificationCode: string): Promise<string> => {
  const url = getVerificationUrl(verificationCode)

  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 300,
  })
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
