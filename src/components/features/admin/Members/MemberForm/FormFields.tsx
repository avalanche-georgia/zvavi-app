import { DatePicker, InputBlock, Select, Textarea, TextInput, toOptions } from '@components/ui'
import { dateFormat, memberStatuses } from '@domain/constants'
import type { MemberFormData, MemberStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

type FormFieldsProps = {
  formData: MemberFormData
  handleFieldChange: <K extends keyof MemberFormData>(
    field: K,
  ) => (value: MemberFormData[K]) => void
  handleTextFieldChange: (
    field: keyof MemberFormData,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormFields = ({ formData, handleFieldChange, handleTextFieldChange }: FormFieldsProps) => {
  const t = useTranslations()

  const statusOptions = toOptions(memberStatuses, (key) => t(`admin.members.statuses.${key}`))

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <InputBlock label={t('admin.members.form.labels.firstName')}>
          <TextInput onChange={handleTextFieldChange('firstName')} value={formData.firstName} />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.lastName')}>
          <TextInput onChange={handleTextFieldChange('lastName')} value={formData.lastName} />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.email')}>
          <TextInput
            onChange={handleTextFieldChange('email')}
            type="email"
            value={formData.email}
          />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.phone')}>
          <TextInput onChange={handleTextFieldChange('phone')} value={formData.phone} />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.memberId')}>
          <TextInput
            onChange={handleTextFieldChange('memberId')}
            placeholder={t('admin.members.form.placeholders.memberId')}
            value={formData.memberId}
          />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.status')}>
          <Select
            onChange={(value) => handleFieldChange('status')(value as MemberStatus)}
            options={statusOptions}
            value={formData.status}
          />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.joinedAt')}>
          <DatePicker
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            dateFormat={dateFormat}
            onChange={(date) => handleFieldChange('joinedAt')(date)}
            selected={formData.joinedAt}
          />
        </InputBlock>
        <InputBlock label={t('admin.members.form.labels.expiresAt')}>
          <DatePicker
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            dateFormat={dateFormat}
            isClearable
            onChange={(date) => handleFieldChange('expiresAt')(date)}
            placeholderText={t('admin.members.form.placeholders.expiresAt')}
            selected={formData.expiresAt}
          />
        </InputBlock>
      </div>
      <InputBlock label={t('admin.members.form.labels.notes')}>
        <Textarea
          onChange={handleTextFieldChange('notes')}
          placeholder={t('admin.members.form.placeholders.notes')}
          rows={3}
          value={formData.notes}
        />
      </InputBlock>
    </>
  )
}

export default FormFields
