'use client'

import { useRef } from 'react'
import { useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import { useLogoUpload } from '@data/hooks/partners'
import type { PartnerFormData } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import Logo from './Logo'

const LogoUpload = () => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { isUploading, upload } = useLogoUpload()
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<PartnerFormData>()
  const logoUrl = watch('logoUrl')
  const hasError = !!errors.logoUrl

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const result = await upload(file)

    if (result.error) {
      toastError('LogoUpload | handleFileChange', {
        error: result.error,
        message: t(`admin.partners.form.errors.logo.${result.error}`),
      })
    } else {
      setValue('logoUrl', result.url, { shouldDirty: true, shouldValidate: true })
    }

    event.target.value = ''
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col items-center gap-4">
        <Logo hasError={hasError} isUploading={isUploading} logoUrl={logoUrl} />

        <Button disabled={isUploading} onClick={() => inputRef.current?.click()} variant="outline">
          <Icon icon="upload" size="sm" />
          {logoUrl
            ? t('admin.partners.form.actions.logoReplace')
            : t('admin.partners.form.actions.logoUpload')}
        </Button>
        <input
          ref={inputRef}
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={handleFileChange}
          type="file"
        />
      </div>
    </div>
  )
}

export default LogoUpload
