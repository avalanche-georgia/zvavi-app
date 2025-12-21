const handleSupabaseError = (error: { message: string } | null) => {
  if (!error) return

  throw new Error(error.message)
}

export default handleSupabaseError
