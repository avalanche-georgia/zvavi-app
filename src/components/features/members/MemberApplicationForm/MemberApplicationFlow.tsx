'use client'

import { useState } from 'react'
import { ContentPage } from '@components/layout'
import { useTranslations } from 'next-intl'

import ApplicationSuccess from './ApplicationSuccess'
import MemberApplicationForm from './MemberApplicationForm'
import type { SubmitResult } from './submitApplication'

// Form → confirmation. The page title and intro belong to the form, so the
// confirmation stands on its own
const MemberApplicationFlow = () => {
  const t = useTranslations()
  const [result, setResult] = useState<SubmitResult | null>(null)

  const handleSubmitted = (submitResult: SubmitResult) => {
    setResult(submitResult)
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  if (result) {
    return (
      <ContentPage>
        <ApplicationSuccess memberId={result.memberId} verificationCode={result.verificationCode} />
      </ContentPage>
    )
  }

  return (
    <ContentPage lede={t('joinUs.apply.description')} title={t('joinUs.apply.title')}>
      <MemberApplicationForm onSubmitted={handleSubmitted} />
    </ContentPage>
  )
}

export default MemberApplicationFlow
