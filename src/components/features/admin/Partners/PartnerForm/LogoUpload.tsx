'use client'

import { useRef } from 'react'
import { Icon } from '@components/icons'
import { Button, Spinner } from '@components/ui'
import { useLogoUpload } from '@data/hooks/partners'
import type { PartnerFormData } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

const LogoUpload = () => {
  const t = useTranslations()
  const { error, isUploading, upload } = useLogoUpload()
  const inputRef = useRef<HTMLInputElement>(null)

  const { setValue, watch } = useFormContext<PartnerFormData>()
  const logoUrl = watch('logoUrl')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return
    const url = await upload(file)

    if (url) setValue('logoUrl', url, { shouldDirty: true })
    event.target.value = ''
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        {logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="logo preview"
            className="size-14 shrink-0 rounded-sm border bg-gray-50 object-contain p-1"
            src={logoUrl}
          />
        )}
        <Button disabled={isUploading} onClick={() => inputRef.current?.click()} variant="outline">
          {isUploading ? <Spinner size="sm" /> : <Icon icon="upload" size="sm" />}
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
      {error && (
        <p className="text-xs text-red-600">{t(`admin.partners.form.errors.logo.${error}`)}</p>
      )}
    </div>
  )
}

export default LogoUpload
