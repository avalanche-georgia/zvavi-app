import { useCallback, useState } from 'react'
import type { MemberFormData } from '@domain/types'

const useMemberFormState = (initialData: MemberFormData) => {
  const [formData, setFormData] = useState<MemberFormData>(initialData)

  const handleFieldChange = useCallback(
    <K extends keyof MemberFormData>(field: K) =>
      (value: MemberFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
      },
    [],
  )

  const handleTextFieldChange = useCallback(
    (field: keyof MemberFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      },
    [],
  )

  return {
    formData,
    handleFieldChange,
    handleTextFieldChange,
    setFormData,
  }
}

export default useMemberFormState
