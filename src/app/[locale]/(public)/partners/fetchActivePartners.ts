import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import { partnerTiers } from '@domain/constants'
import type { Partner } from '@domain/types'
import shuffle from 'lodash/shuffle'

import { createClient } from '@/lib/supabase/server'

// Active partners, tiers 1 → 2 → 3, each tier in a fresh random order on every
// request so no partner keeps the first spot. A failed load throws to the
// (public) error boundary — an empty list would read as "no main partner yet".
const fetchActivePartners = async (): Promise<Partner[]> => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('partners').select('*').eq('is_active', true)

  handleSupabaseError(error)

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const partners = convertSnakeToCamel(data ?? []) as Partner[]

  return partnerTiers.flatMap((tier) =>
    shuffle(partners.filter((partner) => partner.tier === tier)),
  )
}

export default fetchActivePartners
