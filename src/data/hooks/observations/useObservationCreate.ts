import { observationsKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { SubmitObservationBody } from '@/api/observations/schema'

type SubmitObservationResult = { id: number }
// honeypot isn't part of the validated server contract (checked ad hoc before
// schema parsing), but the route still expects it on the wire.
type CreateObservationPayload = SubmitObservationBody & { honeypot: string }

const createObservation = async (
  body: CreateObservationPayload,
): Promise<SubmitObservationResult> => {
  const response = await fetch('/api/observations', {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const result = await response.json()

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to submit observation')

  return { id: result.id }
}

const useObservationCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<SubmitObservationResult, Error, CreateObservationPayload>({
    mutationFn: createObservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: observationsKeys.all })
    },
  })
}

export default useObservationCreate
