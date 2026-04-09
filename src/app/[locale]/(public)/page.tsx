import { AboutUs, CurrentForecastContainer, JoinUs, Partners } from '@components/features/home'
import { convertSnakeToCamel } from '@data/helpers'
import type { Partner } from '@domain/types'
import { createClient } from 'src/lib/supabase/server'

const Home = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .eq('tier', 1)
    .order('name_en', { ascending: true })

  const partners = convertSnakeToCamel(data ?? []) as Partner[]

  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-8 px-4 pt-3 pb-6">
      <CurrentForecastContainer />
      <Partners partners={partners} />
      <AboutUs />
      <JoinUs />
    </div>
  )
}

export default Home
