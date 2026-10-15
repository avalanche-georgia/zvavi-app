'use client'

import { SocialPlatformIcon } from '@components/shared'
import { FormTextField } from '@ds/form'
import { Button, FieldGroup, IconButton } from '@ds/primitives'
import { Link2, Plus, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFieldArray, useWatch } from 'react-hook-form'

import type { UserProfileFormInput } from './schema'

import { maxSocialLinks, normalizeSocialUrl, parseSocialLink } from '@/lib/socialLinks'

// Up to five links; the logo inside each input appears once the site is recognised
const SocialLinksField = () => {
  const t = useTranslations()
  const { append, fields, remove } = useFieldArray<UserProfileFormInput>({ name: 'socialLinks' })
  const links = useWatch<UserProfileFormInput, 'socialLinks'>({ name: 'socialLinks' })

  const handleAdd = () => append({ url: '' })

  const getLeadingIcon = (index: number) => {
    const link = parseSocialLink(normalizeSocialUrl(links?.[index]?.url ?? ''))

    if (!link) return <Link2 className="size-4.5" />

    return <SocialPlatformIcon className="text-ink size-4.5" platform={link.platform} />
  }

  return (
    <FieldGroup
      hint={t('admin.profile.form.hints.socialLinks', { max: maxSocialLinks })}
      label={t('admin.profile.form.labels.socialLinks')}
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-1">
          <FormTextField<UserProfileFormInput>
            className="min-w-0 flex-1"
            isLabelHidden
            label={t('admin.profile.form.labels.socialLink', { number: index + 1 })}
            leading={getLeadingIcon(index)}
            name={`socialLinks.${index}.url`}
            placeholder={t('admin.profile.form.placeholders.socialLink')}
            type="url"
          />
          {/* Centred on the 46px input; stays put when an error shows below it */}
          <IconButton
            aria-label={t('admin.profile.form.actions.removeLink', { number: index + 1 })}
            className="mt-0.75"
            onClick={() => remove(index)}
            size="md"
          >
            <X className="size-4.5" />
          </IconButton>
        </div>
      ))}
      {fields.length < maxSocialLinks && (
        <Button className="w-fit" onClick={handleAdd} size="sm" variant="secondary">
          <Plus aria-hidden className="size-4" />
          {t('admin.profile.form.actions.addLink')}
        </Button>
      )}
    </FieldGroup>
  )
}

export default SocialLinksField
