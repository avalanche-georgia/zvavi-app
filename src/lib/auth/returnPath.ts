// Where to go after signing in: the admin page that sent the visitor to the login
export const returnPathParam = 'next'

// Only an admin path of this site (no locale) — never an external or arbitrary address
export const getSafeReturnPath = (value: string | null) =>
  value && /^\/admin(\/|\?|$)/.test(value) ? value : null
