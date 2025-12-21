import { ForecastContainer } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { notFound } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

const ForecastPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (Number.isNaN(forecastId)) {
    notFound()
  }

  const supabase = await createClient()
  const { data } = await supabase
    .from('forecasts')
    .select('id')
    .match({ id: forecastId, status: 'published' })
    .single()

  if (!data) {
    notFound()
  }

  return (
    <PageWrapper>
      <ForecastContainer forecastId={forecastId} />
    </PageWrapper>
  )
}

export default ForecastPage
