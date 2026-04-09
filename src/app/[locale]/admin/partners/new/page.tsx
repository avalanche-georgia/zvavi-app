'use client'

import { getInitialFormData, PartnerForm } from '@components/features/admin/Partners/PartnerForm'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewPartnerPage = () => {
  const router = useRouter()

  const handleCancel = () => {
    router.push(routes.admin.partners.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.partners.root)
  }

  return (
    <PartnerForm
      initialFormData={getInitialFormData(null)}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  )
}

export default NewPartnerPage
