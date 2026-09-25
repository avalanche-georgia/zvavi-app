'use client'

import { useState } from 'react'

import ObservationSubmitForm from './ObservationSubmitForm'
import SubmitSuccess from './SubmitSuccess'

// Form → thank-you view. "Submit another" remounts the form (new key), which
// resets every field and the photo uploads in one go.
const ObservationSubmitFlow = () => {
  const [formKey, setFormKey] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitted = () => {
    setIsSubmitted(true)
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  const handleSubmitAnother = () => {
    setFormKey((key) => key + 1)
    setIsSubmitted(false)
  }

  if (isSubmitted) return <SubmitSuccess onSubmitAnother={handleSubmitAnother} />

  return <ObservationSubmitForm key={formKey} onSubmitted={handleSubmitted} />
}

export default ObservationSubmitFlow
