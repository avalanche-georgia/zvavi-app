import { useCallback, useState } from 'react'
import type { Avalanche, BaseFormData, ForecastFormData, Problem } from '@domain/types'

const useForecastFormState = (initialFormData: ForecastFormData) => {
  const { baseFormData, forecastDetails } = initialFormData

  const [formData, setFormData] = useState<BaseFormData>(baseFormData)
  const [avalancheProblems, setAvalancheProblems] = useState<Problem[]>(
    forecastDetails.avalancheProblems,
  )
  const [recentAvalanches, setRecentAvalanches] = useState<Avalanche[]>(
    forecastDetails.recentAvalanches,
  )

  const handleTextFieldChange = useCallback(
    (fieldName: keyof BaseFormData) =>
      ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: target.value,
        }))
      },
    [],
  )

  return {
    avalancheProblems,
    formData,
    handleTextFieldChange,
    recentAvalanches,
    setFormData,
    setProblems: setAvalancheProblems,
    setRecentAvalanches,
  }
}

export default useForecastFormState
