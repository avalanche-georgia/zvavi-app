'use client'

import { VerificationPage } from '@components/features/verify'
import { useParams } from 'next/navigation'

const VerifyPage = () => {
  const params = useParams()
  const code = params.code as string

  if (!code) {
    return <div>Invalid or missing verification code.</div>
  }

  return <VerificationPage code={code} />
}

export default VerifyPage
