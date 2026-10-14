type AuthCardProps = {
  children: React.ReactNode
  // Shown above the fields when the form can't be used, e.g. an expired reset link
  error?: string
  title: string
}

// Narrow centred card for the sign-in flow (login, forgot / set new password)
const AuthCard = ({ children, error, title }: AuthCardProps) => (
  <div className="flex w-full justify-center px-4 py-12">
    <section className="rounded-card bg-surface border-rule flex w-full max-w-sm flex-col gap-5 border px-5 py-6 md:px-6">
      <h1 className="text-title text-ink text-center font-bold">{title}</h1>
      {error && (
        <p className="text-copy-sm text-danger text-center" role="alert">
          {error}
        </p>
      )}
      {children}
    </section>
  </div>
)

export default AuthCard
