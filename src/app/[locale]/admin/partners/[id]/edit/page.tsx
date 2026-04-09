'use client'

import { getInitialFormData, PartnerForm } from '@components/features/admin/Partners/PartnerForm'
import { Spinner } from '@components/ui'
import { usePartnerQuery } from '@data/hooks/partners'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NotFound = () => {
  const t = useTranslations()

  return (
    <div className="rounded-lg bg-white p-6 text-center shadow-sm">
      <p className="text-gray-600">{t('admin.partners.notFound')}</p>
    </div>
  )
}

const EditPartnerPage = () => {
  const router = useRouter()
  const params = useParams()

  const partnerId = params.id as string

  const { data: partner, isPending } = usePartnerQuery({ partnerId })

  const handleCancel = () => {
    router.push(routes.admin.partners.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.partners.root)
  }

  if (!partnerId) {
    return <NotFound />
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (!partner) {
    return <NotFound />
  }

  return (
    <PartnerForm
      initialFormData={getInitialFormData(partner)}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
      partner={partner}
    />
  )
}

export default EditPartnerPage
