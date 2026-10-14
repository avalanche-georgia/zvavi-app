'use client'

import { useRef } from 'react'
import { useToast } from '@components/hooks'
import { useLogoUpload } from '@data/hooks/partners'
import type { PartnerFormData } from '@domain/types'
import { Button } from '@ds/primitives'
import { Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import Logo from './Logo'

const acceptedTypes = 'image/png,image/jpeg,image/webp,image/svg+xml'

// Uploads at once and keeps the public URL in the form
const LogoUpload = () => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { isUploading, upload } = useLogoUpload()
  const inputRef = useRef<HTMLInputElement>(null)
  const { control, setValue } = useFormContext<PartnerFormData>()
  const logoUrl = useWatch({ control, name: 'logoUrl' })

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const file = input.files?.[0]

    if (!file) return

    const result = await upload(file)

    // The same file can be picked again after an error
    input.value = ''

    if (result.error) {
      return void toastError('LogoUpload | handleFileChange', {
        error: result.error,
        message: t(`admin.partners.form.errors.logo.${result.error}`),
      })
    }

    setValue('logoUrl', result.url, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <div className="flex items-center gap-4">
      <Logo isUploading={isUploading} logoUrl={logoUrl} />
      <div className="flex flex-col items-start gap-2">
        <Button
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          size="sm"
          variant="secondary"
        >
          <Upload aria-hidden className="size-4" />
          {t(`admin.partners.form.actions.${logoUrl ? 'logoReplace' : 'logoUpload'}`)}
        </Button>
        <p className="text-caption text-muted">{t('admin.partners.form.hints.logo')}</p>
      </div>
      <input
        ref={inputRef}
        accept={acceptedTypes}
        className="hidden"
        onChange={handleFileChange}
        tabIndex={-1}
        type="file"
      />
    </div>
  )
}

export default LogoUpload
